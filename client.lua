function Show(title, content, position)
    SendNUIMessage({
        action = "open",
        title = title,
        content = content,
        position = position,
    })
end

function Close()
    print(_('closing_nui'))
    SendNUIMessage({
        action = "close",
    })
end

exports("Show", Show)
exports("Close", Close)


RegisterCommand('open', function(source, args, rawCommand)
    if #args < 2 then
        Show(args[1])
        return
    end

    print(_('opening_nui', args[1], args[2]))

    -- Assuming Show is a function defined elsewhere in your script
    Show(args[1], args[2], args[3])
end)


RegisterCommand('close', function(source, args, RawCommand)
    print(_('closing_nui'))
    Close()
end)
