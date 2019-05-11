(function() {
    function setVisibility(details, value) {
    	details.parent().css('list-style-type', !value ? '"▶ "' : '"▼ "').text();
    	details.css('display', value ? '' : 'none');
    };

    var targets = {
        'furaffinity': 'images/furaffinity.ico',
        'inkbunny': 'images/inkbunny.ico'
    };

    var content_warnings = {
        'cbt': 'https://en.wikipedia.org/wiki/Cock_and_ball_torture',
        'bdsm': 'https://en.wikipedia.org/wiki/BDSM'
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

        $('a').each(function(index, element) {
            if (element.hasAttribute('data-target')) {
                var target = $(element).attr('data-target');
                var icon = targets[target];
                $(element).empty();
                var newIcon = $('<img />');
                newIcon.attr('src', icon);
                newIcon.addClass('icon');
                $(element).append(newIcon);
            } 
        });        

        $('.content-warnings').each(function(index, element) {
            var tags = $(element).text().split(', ');
            $(element).empty();
            $.each(tags, function(index, item) {
                var link = $('<a />');
                link.attr('href', content_warnings[item.toLowerCase()]);
                link.attr('target', '_blank');
                link.text(item);
                $(element).append(link);
                $(element).append(' ');
            });
        });
    });
})();   