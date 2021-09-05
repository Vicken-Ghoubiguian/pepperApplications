<?xml version="1.0" encoding="UTF-8" ?>
<Package name="jgangnamstyle" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="." xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="dance_jgangnamstyle" src="dance_jgangnamstyle/dance_jgangnamstyle.dlg" />
    </Dialogs>
    <Resources>
        <File name="icon" src="icon.png" />
        <File name="07_GangnamStyleogg" src="07_GangnamStyleogg.ogg" />
        <File name="DTTrajectoryFileName" src="DTTrajectoryFileName.py" />
        <File name="trajectory" src="trajectory.pmt" />
        <File name="image" src="html/image.jpg" />
        <File name="index" src="html/index.html" />
    </Resources>
    <Topics>
        <Topic name="dance_jgangnamstyle_enu" src="dance_jgangnamstyle/dance_jgangnamstyle_enu.top" topicName="jgangnamstyle" language="en_US" />
        <Topic name="dance_jgangnamstyle_frf" src="dance_jgangnamstyle/dance_jgangnamstyle_frf.top" topicName="jgangnamstyle" language="fr_FR" />
        <Topic name="dance_jgangnamstyle_jpj" src="dance_jgangnamstyle/dance_jgangnamstyle_jpj.top" topicName="jgangnamstyle" language="ja_JP" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_fr_FR" src="translations/translation_fr_FR.ts" language="fr_FR" />
        <Translation name="translation_ja_JP" src="translations/translation_ja_JP.ts" language="ja_JP" />
    </Translations>
</Package>
