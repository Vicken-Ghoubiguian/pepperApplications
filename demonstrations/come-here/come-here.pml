<?xml version="1.0" encoding="UTF-8" ?>
<Package name="come-here" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="interactive/come-here" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/CantFindHuman/cant_1" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/CantFindHuman/cant_2" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/IFindYou/find_1" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/IFindYou/find_2" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/WhatCanIdoForYou/help_1" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/WhatCanIdoForYou/help_2" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/MovingTowards/movingtowards_1" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/MovingTowards/movingtowards_2" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/Pepper/Stand/MovingTowards/movingtowards_3" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="collaborative_dialog_comehere" src="dialogs/collaborative_dialog_comehere/collaborative_dialog_comehere.dlg" />
        <Dialog name="interactive_dialog_feedbacks" src="dialogs/interactive_dialog_feedbacks/interactive_dialog_feedbacks.dlg" />
    </Dialogs>
    <Resources>
        <File name="icon" src="icon.png" />
        <File name="ccanimationmanager_comehere" src="lib/ccanimationmanager_comehere.py" />
        <File name="ccanimationmanager_comehere" src="lib/ccanimationmanager_comehere.pyc" />
        <File name="cctools_comehere" src="lib/cctools_comehere.py" />
        <File name="cctools_comehere" src="lib/cctools_comehere.pyc" />
    </Resources>
    <Topics>
        <Topic name="collaborative_dialog_comehere_enu" src="dialogs/collaborative_dialog_comehere/collaborative_dialog_comehere_enu.top" topicName="collaborative_dialog_comehere" language="en_US" />
        <Topic name="collaborative_dialog_comehere_frf" src="dialogs/collaborative_dialog_comehere/collaborative_dialog_comehere_frf.top" topicName="collaborative_dialog_comehere" language="fr_FR" />
        <Topic name="collaborative_dialog_comehere_jpj" src="dialogs/collaborative_dialog_comehere/collaborative_dialog_comehere_jpj.top" topicName="collaborative_dialog_comehere" language="ja_JP" />
        <Topic name="interactive_dialog_feedbacks_enu" src="dialogs/interactive_dialog_feedbacks/interactive_dialog_feedbacks_enu.top" topicName="interactive_dialog_feedbacks" language="en_US" />
        <Topic name="interactive_dialog_feedbacks_frf" src="dialogs/interactive_dialog_feedbacks/interactive_dialog_feedbacks_frf.top" topicName="interactive_dialog_feedbacks" language="fr_FR" />
        <Topic name="interactive_dialog_feedbacks_jpj" src="dialogs/interactive_dialog_feedbacks/interactive_dialog_feedbacks_jpj.top" topicName="interactive_dialog_feedbacks" language="ja_JP" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_fr_FR" src="translations/translation_fr_FR.ts" language="fr_FR" />
        <Translation name="translation_ja_JP" src="translations/translation_ja_JP.ts" language="ja_JP" />
    </Translations>
</Package>
