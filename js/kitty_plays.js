(function() {
  var data = null;

  var init = () => {
    $.getJSON('data/kitty_plays.json', data_received);
    $('#controls input[type="radio"]').each((_, element )=> {
      var name = $(element).attr('name');
      var value = $(element).attr('value');
      $(element).click(optionSetter(name, value));
    });
  };

  var optionSetter = (name, value) => {
    return () => $('#content').attr('data-' + name, value);
  }

  var data_received = received_data => {
    data = received_data;
    
    var template = $("#template");
    
    data.forEach(element => {
      var newItem = template.clone();
      $(newItem).removeAttr('id');
      $(newItem).find('.image img').attr('src', element.image);
      $(newItem).find('.name').text(element.name);
      $(newItem).find('a').attr('href', element.link);
      $(newItem).find('.language img').attr('src', 'images/flags/' + element.language + '.svg');

      $('#content').append(newItem);
    });

    template.remove();
  }



  $(document).ready(init);
})();