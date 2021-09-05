#!/usr/bin/env python
# -*- coding: utf-8 -*-

import qi
import uuid
import random

@qi.multiThreaded()
class CCToolsComeHere:
    """qi service that provides common methods for the services used in Recharge"""

    #!----------------------------------------------------------------------!
    #!--------------------------- INIT FUNCTIONS ---------------------------!
    #!----------------------------------------------------------------------!

    def __init__(self, session):
        # get sessions
        self.session     = session
        
        # get services
        self.memory      = self.session.service("ALMemory")
        self.serviceDir  = self.session.service("ServiceDirectory")
        
        # datas
        self.serviceName = "CCToolsComeHere"
        self.logger      = qi.Logger("core.content")
        self.shuffle     = {}

    #!----------------------------------------------------------------------!
    #!-------------------------- BINDED FUNCTIONS --------------------------!
    #!----------------------------------------------------------------------!

    @qi.bind(returnType = qi.AnyArguments)
    def getLogger(self):
        """return core content logger object"""
        return self.logger

    @qi.bind(paramsType = [qi.List(qi.AnyArguments)])
    def unregisterShuffle(self, listToShuffle):
        """delete a previously registered shuffle list"""
        uid = self.getShuffleUid(listToShuffle)
        if uid:
            del self.shuffle[uid]

    @qi.bind(returnType = qi.Map(qi.String, qi.Map(qi.String, qi.AnyArguments)))
    def getRegisteredShuffle(self):
        """return all registered shuffle"""
        return self.shuffle

    @qi.bind(paramsType = [qi.List(qi.AnyArguments)], returnType = qi.AnyArguments)
    def getShuffle(self, listToShuffle):
        """get a shuffled item from list"""
        # if list is empty print error
        if not listToShuffle:
            self.logger.error("CCToolsComeHere", "getShuffle", "Can't shuffle an empty list")
            return

        # if list has only one element, return it
        elif len(listToShuffle) == 1:
            return listToShuffle.pop()

        # does shuffle exist?
        uid = self.getShuffleUid(listToShuffle)

        if not uid:
            uid = self.registerShuffle(listToShuffle)

        # if shuffled is empty, shuffle again source
        source = list(self.shuffle[uid]["source"])
        if not self.shuffle[uid]["shuffled"]:
            self.shuffle[uid]["shuffled"] = self.shuffleList(source)

        # if item to pop == last popped item, translate it to first position & pop again
        toPop = self.shuffle[uid]["shuffled"].pop()
        if toPop == self.shuffle[uid]["last"]:
            self.shuffle[uid]["shuffled"].insert(0, toPop)
            toPop = self.shuffle[uid]["shuffled"].pop()

        # save last popped item
        self.shuffle[uid]["last"] = toPop
        return toPop

    @qi.nobind
    def shuffleList(self, listToShuffle):
        """get a random on a shuffle list"""
        shuffled = list(listToShuffle)
        random.shuffle(shuffled)
        return shuffled

    @qi.nobind
    def registerShuffle(self, listToShuffle):
        """register a new list to shuffle"""
        # generate uuid
        uid           = str(uuid.uuid1())
        
        # shuffle list
        source   = set(listToShuffle)
        shuffled = list(source)
        random.shuffle(shuffled)

        # add to memory
        self.shuffle[uid] = {
            "source": source,
            "shuffled": shuffled,
            "last": None,
        }

        return uid

    @qi.nobind
    def getShuffleUid(self, listToShuffle):
        """return UID corresponding to a list"""
        for key, value in self.shuffle.iteritems():
            if value["source"] == set(listToShuffle):
                return key
        return ""
    
    @qi.bind(paramsType = [qi.Int32, qi.Int32, qi.String], returnType = qi.String)
    def getLocalizedTime(self, hour, minute, language):
        """ Adapt the given time to the given language
            Parameters: hour - the hours to adapt
                        minute - the minutes to adapt
                        language - the language to adapt to
            Returns:    String - the adaptation of the given hour/min. 
                        For example, 16:00 in English becomes 4:00PM
        """
        result = "time"
        if hour and minute:
            # English
            if language == "English":
                if hour == 12:
                    result = str(hour) + " " + str(minute) + " PM"
                elif hour > 12:
                    result = str(hour - 12) + " " + str(minute) + " PM"
                else:
                    result = str(hour) + " " + str(minute) + " AM"
            # Japanese
            else:
                result = str(hour) + "時" + str(minute) + "分"
        return result
    
    @qi.bind(paramsType = [qi.String, qi.String], returnType = qi.Int32)
    def registerService(self, name, behaviorId):
        """ Register a new service in the current session.
            Parameters: name - the service's name
                        behaviorId - the id of the behavior registering the service 
            Returns:    int - the new service Id
        """
        #self.behaviorId = behaviorId
        # add library folder to sys.path
        #import sys, os
        #packagePath = self.getPackagePath().rsplit("/", 1)[0]
        #libPath = os.path.join(packagePath, "lib/")
        #sys.path.append(libPath)

        # declare service id
        newServiceId = None

        # is service already registered?
        registeredServices = [service["name"] for service in self.session.services()]

        if name not in registeredServices:
            
            newService = self._registerInSession(name)

            if not newService:
                self.logger.error(name + " does not work on virtual robot.")
                return

            newServiceId = self.session.registerService(name, newService)

        return newServiceId
    
    @qi.nobind
    def _registerInSession(self, name):
        """ register a service into session, depending of its name
            Returns:     A new instance of the service
        """
        if name == "AnimatedRecharge":
            # import library
            import animated_recharge
            reload(animated_recharge)

            # register service
            return animated_recharge.AnimatedRecharge(self.session)
        elif name == "ChargingProgress":
            import charging_progress
            reload(charging_progress)

            # register service
            return charging_progress.ChargingProgress(self.session)
        
    @qi.bind(paramsType = [qi.Int32])
    def unregisterService(self, serviceId):
        """ Unregister a service from the current session by its Id.
            Parameters: serviceId - the id of the service to unregister
        """
        self.session.unregisterService(serviceId)
        
    @qi.nobind
    def getPackagePath(self):
        import re
        framemanager = self.session.service('ALFrameManager')
        path = framemanager.getBehaviorPath(self.behaviorId)
        regex = re.compile("(?P<packagePath>.*)(?=%s)" % self.getBehaviorRelativePath())
        return regex.search(path).group('packagePath')
    @qi.nobind
    def getUID(self):
        import re
        framemanager = self.session.service('ALFrameManager')
        path = framemanager.getBehaviorPath(self.behaviorId)
        regex = re.compile("(?<=/PackageManager/apps/)(?P<uid>.*)(?=/.*)")
        return regex.search(path).group('uid')
    @qi.nobind
    def getBehaviorRelativePath(self):
        import re
        framemanager = self.session.service('ALFrameManager')
        path = framemanager.getBehaviorPath(self.behaviorId)
        regex = re.compile("(?<=/PackageManager/apps/%s)(?P<relativePath>.*)" % self.getUID())
        return regex.search(path).group('relativePath')
        
                