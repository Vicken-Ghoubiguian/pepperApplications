#!/usr/bin/env python
# -*- coding: utf-8 -*-

import qi
import re
import threading
from cctools_comehere import *

@qi.multiThreaded()
class CCAnimationManagerComeHere():
    """This service handle animations launching"""

    def __init__(self, session):
        # get sessions
        self.session           = session
        
        # get services
        self.memory            = self.session.service("ALMemory")
        self.behaviorManager   = self.session.service("ALBehaviorManager")
        self.robotModel        = self.session.service("ALRobotModel")
        self.robotPosture      = self.session.service("ALRobotPosture")
        self.ccTools           = CCToolsComeHere(self.session)
        
        # datas
        self.serviceName       = "CCAnimationManagerComeHere"
        self.logger            = self.ccTools.getLogger()
        self.lock              = threading.Lock()
        self.currentAnimation  = None

    #!----------------------------------------------------------------------!
    #!-------------------------- BINDED FUNCTIONS --------------------------!
    #!----------------------------------------------------------------------!

    @qi.bind(returnType = qi.String)
    def getServiceName(self):
        """get service name"""
        return self.serviceName

    @qi.bind(paramsType = [qi.String, qi.Bool], returnType = qi.String)
    def runAnimation(self, animation, asynchronous):
        """run an animation synchronously or asynchronously"""
        if self.currentAnimation:
            self.stopAnimation(self.currentAnimation, False)
        self.currentAnimation = animation
        future = qi.async(self.behaviorManager.runBehavior, animation, delay = 0)
        if not asynchronous:
            future.wait()
        return animation

    @qi.bind(paramsType = [qi.String, qi.Bool])
    def stopAnimation(self, animation, asynchronous):
        """stop an animation"""
        future = qi.async(self.behaviorManager.stopBehavior, animation, delay = 0)
        if not asynchronous:
            future.wait()
        self.currentAnimation = None

    @qi.bind(paramsType = [qi.String, qi.String, qi.Bool], returnType = qi.String)
    def runAnimationByTag(self, uid, tag, asynchronous):
        """run an animation from given tag in given package uid synchronously or asynchronously"""
        animations        = self.getAnimationsByTags(uid, [tag])
        try:
            selectedAnimation = random.choice(animations)
            return self.runAnimation(selectedAnimation, asynchronous)
        # If list is empty
        except IndexError:
            return ""

    @qi.bind(paramsType = [qi.String, qi.List(qi.String), qi.Bool], returnType = qi.String)
    def runAnimationByTags(self, uid, tags, asynchronous):
        """run an animation randomly from given tags list in given package uid synchronously or asynchronously"""
        animations        = self.getAnimationsByTags(uid, tags)
        selectedAnimation = random.choice(animations)
        return self.runAnimation(selectedAnimation, asynchronous)

    @qi.bind(paramsType = [qi.String, qi.List(qi.String)])
    def getAnimationsByTags(self, uid, tags):
        """return all animations behaviors in corresponding package uid with requested tags"""
        behaviorsList = list()
        for tag in tags:
            # get all package with tag
            behaviors     = self.behaviorManager.getBehaviorsByTag(tag)
            
            # if package UID in tag, return only behavior from package UID compatible with robot type & robot posture
            regex         = re.compile("%s.*/%s/%s/.*" % (uid, self.getRobotType(), self.getRobotPostureFamily()))
            
            behaviors     = [behavior for behavior in behaviors if regex.match(behavior)]
            behaviorsList += behaviors

        if not behaviorsList:
            self.logger.warning(self.serviceName, "getBehaviorByTags", "Can't find any behavior with tags : %s for robot %s & posture %s in package with UID %s" % (tags, self.getRobotType(), self.getRobotPostureFamily(), uid))
        else:
            self.logger.info(self.serviceName, "getBehaviorByTags", "Found %s behavior(s) with tags : %s for robot %s & posture %s in package with UID %s" % (len(behaviorsList), tags, self.getRobotType(), self.getRobotPostureFamily(), uid))
        return behaviorsList

    #!----------------------------------------------------------------------!
    #!------------------------- UNBINDED FUNCTIONS -------------------------!
    #!----------------------------------------------------------------------!

    @qi.nobind
    def getRobotType(self):
        """ret robot type name"""
        type = self.robotModel._getRobotTypeString().title()
        if type == "Juliette":
            type = "Pepper"
            
        return type

    @qi.nobind
    def getRobotPostureFamily(self):
        """ret current robot posture family"""
        postureConverter = {
            "Standing": "Stand",
            "Sitting": "Sit",
            "SittingOnChair": "SitOnPod",
            }

        posture = self.robotPosture.getPostureFamily()

        if posture in postureConverter.keys():
            posture = postureConverter[posture]
        return posture
