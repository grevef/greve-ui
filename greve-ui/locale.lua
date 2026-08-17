local locale = GetConvar('greve_ui:locale', 'en')

function _(str, ...)
    local translation = (Locales[locale] and Locales[locale][str]) or (Locales['en'] and Locales['en'][str]) or str

    if select('#', ...) > 0 then
        return string.format(translation, ...)
    end

    return translation
end
