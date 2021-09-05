<?xml version="1.0" encoding="UTF-8" ?>
<Package name="dango3kyodai" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="." xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="dance_dango3kyodai" src="dance_dango3kyodai/dance_dango3kyodai.dlg" />
    </Dialogs>
    <Resources>
        <File name="icon" src="icon.png" />
        <File name="0424_Dango" src="0424_Dango.ogg" />
        <File name="0514_dango" src="0514_dango.ogg" />
        <File name="dango_0820" src="dango_0820.ogg" />
        <File name="DTTrajectoryFileName" src="DTTrajectoryFileName.py" />
        <File name="trajectory" src="trajectory.pmt" />
        <File name="image" src="html/image.jpg" />
        <File name="index" src="html/index.html" />
        <File name="index_old" src="html/index_old.html" />
        <File name="translation_en_US" src="translations/translation_en_US.qm" />
        <File name="translation_fr_FR" src="translations/translation_fr_FR.qm" />
        <File name="translation_ja_JP" src="translations/translation_ja_JP.qm" />
    </Resources>
    <Topics>
        <Topic name="dance_dango3kyodai_enu" src="dance_dango3kyodai_enu.top" topicName="dango3kyodai" language="en_US" />
        <Topic name="dance_dango3kyodai_frf" src="dance_dango3kyodai_frf.top" topicName="dango3kyodai" language="fr_FR" />
        <Topic name="dance_dango3kyodai_jpj" src="dance_dango3kyodai_jpj.top" topicName="dango3kyodai" language="ja_JP" />
        <Topic name="dance_dango3kyodai_enu" src="dance_dango3kyodai/dance_dango3kyodai_enu.top" topicName="dango3kyodai" language="en_US" />
        <Topic name="dance_dango3kyodai_frf" src="dance_dango3kyodai/dance_dango3kyodai_frf.top" topicName="dango3kyodai" language="fr_FR" />
        <Topic name="dance_dango3kyodai_jpj" src="dance_dango3kyodai/dance_dango3kyodai_jpj.top" topicName="dango3kyodai" language="ja_JP" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_fr_FR" src="translations/translation_fr_FR.ts" language="fr_FR" />
        <Translation name="translation_ja_JP" src="translations/translation_ja_JP.ts" language="ja_JP" />
    </Translations>
</Package>
