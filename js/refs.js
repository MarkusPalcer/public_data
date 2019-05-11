(function() {
    function setVisibility(details, value) {
    	details.parent().css('list-style-type', !value ? '"▶ "' : '"▼ "').text();
    	details.css('display', value ? '' : 'none');
    };

    var hosts = {
        'www.furaffinity.net': {
            'icon': 'images/furaffinity.ico',
            'name': 'FurAffinity'
        },
        'www.inkbunny.net': { 
            'icon': 'images/inkbunny.ico', 
            'name': 'Inkbunny'
        },
        'inkbunny.net': {
            'icon': 'images/inkbunny.ico', 
            'name': 'Inkbunny'            
        }
    };

    var content_warnings = {
        'cbt': 'https://en.wikipedia.org/wiki/Cock_and_ball_torture',
        'bdsm': 'https://en.wikipedia.org/wiki/BDSM',
        'spanking': 'https://en.wikipedia.org/wiki/Erotic_spanking',
        'chastity': 'https://en.wikipedia.org/wiki/Chastity_belt_(BDSM)'
    };

    $(document).ready(function() {
        $('body > ul > li > ul').each(function(index, element) {
            var elem = $(element);
            var value = !element.hasAttribute('data-collapsed');
            var parent = elem.parent();
            var title = parent.children().first();
            
            title.css('cursor', 'pointer');
            setVisibility(elem, value);
            title.click(function() {
                value = !value;
                setVisibility(elem, value);
            });
        });

        $('#link-legend').css('display','');

        $('.links a').each(function(index, element) {
            var host = hosts[element.hostname];
            if (host !== null) {
                $(element).empty();
                var newIcon = $('<img />');
                newIcon.attr('src', host['icon']);
                newIcon.addClass('icon');
                $(element).prepend(newIcon);
                $(element).append(host['name'])
            }
        });        

        $('[data-warning-tags]').each(function(index, element) {
            var tags = $(element).attr('data-warning-tags').split(', ');
            $(element).empty();
            $.each(tags, function(index, item) {
                var link = $('<a />');
                link.attr('href', content_warnings[item.toLowerCase()]);
                link.attr('target', '_blank');
                link.text(item);
                $(element).append(link);
                $(element).append(' ');
            });
            var image = $('<img />');
            image.attr('src', 'images/warning.png');
            $(element).prepend(image);

        });
    });
})();   