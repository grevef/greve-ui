fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Greve'
description 'CoreRP UI Element'
version '1.0.0'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/**/*',
}

client_scripts {
    'locales/en.lua',
    'locales/no.lua',
    'locale.lua',
    'client.lua',
}

dependencies {
    'qbx_core',
}
