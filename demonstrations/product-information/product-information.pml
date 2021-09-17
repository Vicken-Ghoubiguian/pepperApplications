<?xml version="1.0" encoding="UTF-8" ?>
<Package name="product-information" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="." xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="product-information" src="product-information/product-information.dlg" />
        <Dialog name="product-information-launcher" src="product-information-launcher/product-information-launcher.dlg" />
    </Dialogs>
    <Resources>
        <File name="icon" src="icon.png" />
        <File name="bip" src="bip.ogg" />
        <File name="background" src="html/background.jpg" />
        <File name="barcode-icon" src="html/barcode-icon.png" />
        <File name="icon" src="html/icon.png" />
        <File name="index" src="html/index.html" />
        <File name="loading" src="html/loading.gif" />
        <File name="bootstrap-theme" src="html/css/bootstrap-theme.css" />
        <File name="bootstrap-theme.css" src="html/css/bootstrap-theme.css.map" />
        <File name="bootstrap-theme.min" src="html/css/bootstrap-theme.min.css" />
        <File name="bootstrap" src="html/css/bootstrap.css" />
        <File name="bootstrap.css" src="html/css/bootstrap.css.map" />
        <File name="bootstrap.min" src="html/css/bootstrap.min.css" />
        <File name="style" src="html/css/style.css" />
        <File name="glyphicons-halflings-regular" src="html/fonts/glyphicons-halflings-regular.eot" />
        <File name="glyphicons-halflings-regular" src="html/fonts/glyphicons-halflings-regular.svg" />
        <File name="glyphicons-halflings-regular" src="html/fonts/glyphicons-halflings-regular.ttf" />
        <File name="glyphicons-halflings-regular" src="html/fonts/glyphicons-halflings-regular.woff" />
        <File name="glyphicons-halflings-regular" src="html/fonts/glyphicons-halflings-regular.woff2" />
        <File name="bootstrap.min" src="html/js/bootstrap.min.js" />
        <File name="fastclick" src="html/js/fastclick.js" />
        <File name="jquery-2.1.4.min" src="html/js/jquery-2.1.4.min.js" />
        <File name="jquery.mobile.custom.min" src="html/js/jquery.mobile.custom.min.js" />
        <File name="main" src="html/js/main.js" />
        <File name="npm" src="html/js/npm.js" />
        <File name="robotutils" src="html/js/robotutils.js" />
        <File name="videoutils" src="html/js/videoutils.js" />
        <File name="dress1" src="html/products/dress1.jpg" />
        <File name="dress2" src="html/products/dress2.jpg" />
        <File name="dress2" src="html/products/dress2.png" />
        <File name="figurineblue1" src="html/products/figurineblue1.jpg" />
        <File name="figurineblue2" src="html/products/figurineblue2.jpg" />
        <File name="figurinered1" src="html/products/figurinered1.jpg" />
        <File name="figurinered2" src="html/products/figurinered2.jpg" />
        <File name="muffin1" src="html/products/muffin1.jpg" />
        <File name="muffin2" src="html/products/muffin2.jpg" />
        <File name="nao1" src="html/products/nao1.jpg" />
        <File name="nao2" src="html/products/nao2.jpg" />
        <File name="phone1" src="html/products/phone1.jpg" />
        <File name="phone2" src="html/products/phone2.jpg" />
        <File name="barcodereader" src="lib/barcodereader.py" />
        <File name="zbar" src="lib/zbar.so" />
    </Resources>
    <Topics>
        <Topic name="product-information_enu" src="product-information/product-information_enu.top" topicName="product-information" language="en_US" />
        <Topic name="product-information_frf" src="product-information/product-information_frf.top" topicName="product-information" language="fr_FR" />
        <Topic name="product-information_spe" src="product-information/product-information_spe.top" topicName="product-information" language="es_ES" />
        <Topic name="product-information-launcher_enu" src="product-information-launcher/product-information-launcher_enu.top" topicName="product-information-launcher" language="en_US" />
        <Topic name="product-information-launcher_frf" src="product-information-launcher/product-information-launcher_frf.top" topicName="product-information-launcher" language="fr_FR" />
        <Topic name="product-information-launcher_spe" src="product-information-launcher/product-information-launcher_spe.top" topicName="product-information-launcher" language="es_ES" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_es_ES" src="translations/translation_es_ES.ts" language="es_ES" />
        <Translation name="translation_fr_FR" src="translations/translation_fr_FR.ts" language="fr_FR" />
    </Translations>
</Package>
