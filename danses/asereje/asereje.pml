<?xml version="1.0" encoding="UTF-8" ?>
<Package name="asereje" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="." xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="dance_asereje" src="dance_asereje/dance_asereje.dlg" />
    </Dialogs>
    <Resources>
        <File name="icon" src="icon.png" />
        <File name="05_Asereje" src="05_Asereje.ogg" />
        <File name="DTTrajectoryFileName" src="DTTrajectoryFileName.py" />
        <File name="trajectory" src="trajectory.pmt" />
        <File name="image" src="html/image.jpg" />
        <File name="index" src="html/index.html" />
    </Resources>
    <Topics>
        <Topic name="dance_asereje_enu" src="dance_asereje/dance_asereje_enu.top" topicName="asereje" language="en_US" />
        <Topic name="dance_asereje_frf" src="dance_asereje/dance_asereje_frf.top" topicName="asereje" language="fr_FR" />
        <Topic name="dance_asereje_jpj" src="dance_asereje/dance_asereje_jpj.top" topicName="asereje" language="ja_JP" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_fr_FR" src="translations/translation_fr_FR.ts" language="fr_FR" />
        <Translation name="translation_ja_JP" src="translations/translation_ja_JP.ts" language="ja_JP" />
    </Translations>
</Package>
