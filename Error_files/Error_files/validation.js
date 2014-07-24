function getDateTime(date, time_str) {
    var date_time = !date ? new Date() : new Date(date.getTime());
    if (!!time_str) {
        var re = new RegExp("^([0-9]?[0-9]):([0-9]?[0-9])(?::([0-9][0-9]))?$"),
            time = re.exec(time_str);
        if (!time || (time.length < 2))
            return null;
        var hours = time[1], minutes = time[2], secs = time[3];
        if (!!hours) {
            if (hours > 24)
                return null;
            if (hours == 24) {
                if (minutes > 0)
                    return null;
                date_time.setHours(24, 0, 0, 0);
            } else {
                if (!minutes)
                    return null;
                else if (minutes > 59)
                    return null;
                if (!secs)
                    secs = 0;
                else if (secs > 59)
                    return null;
                date_time.setHours(hours, minutes, secs, 0);
            }
        }
    }
    return date_time;
}

function checkRangeTime(start_time, end_time, callback) {
    var start_datetime, end_datetime, duration;
    if (!start_time.value || !(start_datetime = getDateTime(null, start_time.value))) {
        start_time.select();
        start_time.focus();
        return;
    }
    if (!end_time.value || !(end_datetime = getDateTime(null, end_time.value))) {
        end_time.select();
        end_time.focus();
        return;
    }
    duration = ((end_datetime - start_datetime) / 60000)|0;
    if (duration > 0) {
        if (!!callback)
            callback(duration);
    } else {
        end_time.select();
        end_time.focus();
    }
}

function DisplayHowToReceiveReport() {
    var str1 = '1. Select a user or all users;';
    var str2 = '2. Select a project or all projects;';
    var str3 = '3. Select a time period;';
    var str4 = '4. Select a detalization of period: by years, by months, by weeks or by days;';
    var str5 = '5. Select a parameter in "Group by". You may choose only 3 parameters at once.';
    jAlert('<table><tr><td>' + str1 + '</td></tr><tr><td>' + str2 +'</td></tr><tr><td>' + str3 + '</td></tr><tr><td>' + str4 +'</td></tr><tr><td>' + str5 +'</td></tr></table>', "How to receive a report");
    return false;
}

function DisplayHowToReport(ok_text, head, str1, str2, str3, str4, str5) {    
    jAlertWide(ok_text, '<table><tr><td>' + str1 + '</td></tr><tr><td>' + str2 + '</td></tr><tr><td>' + str3 + '</td></tr><tr><td>' + str4 + '</td></tr><tr><td>' + str5 + '</td></tr></table>', head);
    return false;
}

function regExpValidation(source, value, re) {
    if ((source.classList.contains("unrequired-field") && !value) || re.test(value)) {
        source.classList.remove("invalid");
        return true;
    } else {
        source.classList.add("invalid");
        return false;
    }
}

function validatePassword(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[\\[\\]{}/~`@'#.$;%^+!\"()*,:?a-z0-9\u0430-\u044F_-]{4,30}$", "i"));
}

function validateConfirmPassword(source, args) {
    var confirm = document.getElementById(source.controltovalidate),
        password = $(".password-field").val();
    if (args.Value == password) {
        confirm.classList.remove("invalid");
        args.IsValid = true;
    } else {
        confirm.classList.add("invalid");
        args.IsValid = false;
    }
}

function validateEmail(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[a-z0-9](\.[a-z0-9][a-z0-9\._-]*)*@([a-z0-9]+[a-z0-9-]+(\.[a-z0-9]+[a-z0-9-]+)*\.[a-z]{2,6})$", "i"));
}

function validateName(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[a-z][a-z0-9_]{3,30}$", "i"));
}

function validateText(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[a-z ][a-z0-9_ ]{3,30}$", "i"));
}

function validateMaxUsers(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[0-9]{1,5}$", "i"));
}

function validatePort(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[0-9]{1,5}$", "i"));
}

function validateNum(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[0-9]{1,5}$", "i"));
}

function validateIp(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$", "i"));
}

function validateUrl(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^(http://|https://)((([a-z]+[a-z0-9-]+(\.[a-z0-9]+[a-z0-9-]+)*)(\.[a-z]{2,6})?)|((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])))(:[0-9]{2,4})?(/[a-z0-9\.?=/#%&+_-]+|/|)$", "i"));
}

function requiredField(source, args) {
    var e = document.getElementById(source.controltovalidate);
    if (!!e.value) {
        e.classList.remove("invalid");
        args.IsValid = true;
    } else {
        e.classList.add("invalid");
        args.IsValid = false;
    }
}

function userPrivilegeChanged(e, control_take) {     
    if (e.checked)
        $(".cb-privilege input[type=checkbox]").not(e).removeAttr("checked");

    var cb_take = $("span.cb-take input[id$=checkBoxTakeSceenshot]").get(0);    

    if (control_take) {
        cb_take.checked = e.checked;
        cb_take.disabled = e.checked;                
    }
    else {
        cb_take.checked = false;
        cb_take.disabled = false;
    }
}

function readonlyChanged(e) {
    if (e.checked)
        $(".cb-privilege input[type=checkbox]").not(e).removeAttr("checked");

    var cb_take = $("span.cb-take input[id$=checkBoxTakeSceenshot]").get(0);
    
    if (e.checked){
        cb_take.checked = false;
        cb_take.disabled = true;        
    }
    else {
        cb_take.checked = false;
        cb_take.disabled = false;
    }       
}

function userStateDeletedChanged(e) {
    var disabled = $("span.cb-state input[id$=checkBoxDisabled]").get(0);
    disabled.checked = e.checked;
    disabled.disabled = e.checked;            
}

function validateTimeOffset(source, args) {
    args.IsValid = regExpValidation(document.getElementById(source.controltovalidate), args.Value,
        new RegExp("^[0-9][0-9]?:00:00$"));
}

function validateRangeStartTime(source, args) {
    var e = document.getElementById(source.controltovalidate),
        end_time = $(".range-time-choose-end", e.parentNode).get(0),
        date = $(".range-time-choose-date", e.parentNode).get(0);
    if (!args.Value)
        if (!date.value && !end_time.value) {
            date.classList.remove("invalid");
            end_time.classList.remove("invalid");
            args.IsValid = true;
        } else {
            if (!!getDateTime(null, end_time.value))
                end_time.classList.remove("invalid");
            args.IsValid = false;
        }
    else
        args.IsValid = !!getDateTime(date.CalendarBehavior.get_selectedDate(), args.Value);
    if (args.IsValid)
        e.classList.remove("invalid");
    else
        e.classList.add("invalid");
}

function validateRangeEndTime(source, args) {
    var e = document.getElementById(source.controltovalidate),
        start_time = $(".range-time-choose-start", e.parentNode).get(0),
        date = $(".range-time-choose-date", e.parentNode).get(0);
    if (!args.Value) {
        if (!date.value && !start_time.value) {
            date.classList.remove("invalid");
            start_time.classList.remove("invalid");
            args.IsValid = true;
        } else {
            args.IsValid = false;
        }
    } else {
        var selected_date = date.CalendarBehavior.get_selectedDate();
        var end = getDateTime(selected_date, args.Value);
        if (!end) {
            args.IsValid = false;
        } else {
            var start = getDateTime(selected_date, start_time.value);
            if (!start)
                args.IsValid = true;
            else
                args.IsValid = (start.getTime() < end.getTime());
        }
    }
    if (args.IsValid)
        e.classList.remove("invalid");
    else
        e.classList.add("invalid");
}

function validateRangeDate(source, args) {
    var e = document.getElementById(source.controltovalidate),
        start_time = $(".range-time-choose-start", e.parentNode).get(0),
        end_time = $(".range-time-choose-end", e.parentNode).get(0);
    if (!e.value) {
        if (!start_time.value && !end_time.value) {
            start_time.classList.remove("invalid");
            end_time.classList.remove("invalid");
            args.IsValid = true;
        } else {
            args.IsValid = false;
        }
    } else {
        args.IsValid = !!Date.parseLocale(e.value, e.CalendarBehavior.get_format());
    }
    if (args.IsValid)
        e.classList.remove("invalid");
    else
        e.classList.add("invalid");
}

function checkRangeStartTime(start_time, end_time, args) {
    if (!args.Value) {
        if (!end_time.value) {
            end_time.classList.remove("invalid");
            args.IsValid = true;
        } else {
            if (!!getDateTime(null, end_time.value))
                end_time.classList.remove("invalid");
            args.IsValid = false;
        }
    } else {
        var start = getDateTime(null, args.Value);
        if (!start) {
            args.IsValid = false;
        } else {
            if (!!end_time.value) {
                var end = getDateTime(null, end_time.value);
                if (!!end && (start.getTime() < end.getTime()))
                    end_time.classList.remove("invalid");
                else
                    end_time.classList.add("invalid");
            }
            args.IsValid = true;
        }
    }
    if (args.IsValid)
        start_time.classList.remove("invalid");
    else
        start_time.classList.add("invalid");
}

function validateDeleteTimeStart(source, args) {
    var start_time = document.getElementById(source.controltovalidate);
    checkRangeStartTime(start_time, $(".delete-time-end", start_time.parentNode).get(0), args);
}

function checkRangeEndTime(start_time, end_time, args) {
    if (!args.Value) {
        if (!start_time.value) {
            start_time.classList.remove("invalid");
            args.IsValid = true;
        } else {
            args.IsValid = false;
        }
    } else {
        var end = getDateTime(null, args.Value);
        if (!end) {
            args.IsValid = false;
        } else {
            var start = getDateTime(null, start_time.value);
            if (!start)
                args.IsValid = true;
            else
                args.IsValid = (start.getTime() < end.getTime());
        }
    }
    if (args.IsValid)
        end_time.classList.remove("invalid");
    else
        end_time.classList.add("invalid");
}

function validateDeleteTimeEnd(source, args) {
    var end_time = document.getElementById(source.controltovalidate);
    checkRangeEndTime($(".delete-time-start", end_time.parentNode).get(0), end_time, args);
}

function validateMarkTimeStart(source, args) {
    var start_time = document.getElementById(source.controltovalidate);
    checkRangeStartTime(start_time, $(".mark-time-end", start_time.parentNode).get(0), args);
}

function validateMarkTimeEnd(source, args) {
    var end_time = document.getElementById(source.controltovalidate);
    checkRangeEndTime($(".mark-time-start", end_time.parentNode).get(0), end_time, args);
}

function validateDescription(source, args) {
    var description = document.getElementById(source.controltovalidate);
    if ((args.IsValid = (!!args.Value && (args.Value.length >= 4))))
        description.classList.remove("invalid");
    else
        description.classList.add("invalid");
}

function validateCalendarDate(source, args) {
    var date = document.getElementById(source.controltovalidate);
    if (!date.value) {
        args.IsValid = true;
    } else {
        args.IsValid = !!Date.parseLocale(date.value, date.CalendarBehavior.get_format());
    }
    if (args.IsValid)
        date.classList.remove("invalid");
    else
        date.classList.add("invalid");
}
