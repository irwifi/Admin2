"use strict";
$(document).ready(function() {
  // localStorage.clear();
  console.log(localStorage);
  const config_array = [{"config_element": "info-select-config", "config_selector": ".page-sidebar-wrapper .info-modal .mt-checkbox input[type='checkbox']", "config_identifier": "name", "config_attribute": "checked", "element_selector": ".page-sidebar-wrapper .info .sub-menu .nav-item", "element_identifier": "data-config", "css_property": "display"}];
  load_all_config({config_array});

  $( ".sortable" ).sortable();

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

    $.each(['show', 'hide'], function (i, ev) {
      var el = $.fn[ev];
      $.fn[ev] = function () {
        this.trigger(ev);
        return el.apply(this, arguments);
      };
    });

  $(".page-sidebar-wrapper .info-modal .save_button").on("click", () => {
    toastr.success('Info Selector Configuration Saved!');
    $(".page-sidebar-wrapper .info-modal .close").click();
    info_config_save();
  });

  $(".page-sidebar-wrapper .info-modal").on('hide', () => {
    load_config({"config_element": "info-select-config"});
  });
})

const load_config = (params) => {
  let config_key, css_value;
  const config = {"config_element": "info-select-config", "config_selector": ".page-sidebar-wrapper .info-modal .mt-checkbox input[type='checkbox']", "config_identifier": "name", "config_attribute": "checked", "element_selector": ".page-sidebar-wrapper .info .sub-menu .nav-item", "element_identifier": "data-config", "css_property": "display"};
  const json_obj = JSON.parse(localStorage.getItem(params.config_element));
  for(config_key in json_obj) {
    $(config.config_selector + "[" + config.config_identifier + "='" + config_key + "']").prop(config.config_attribute, json_obj[config_key]);

    if(config.css_property === "display" && json_obj[config_key] === true) {
      css_value = "block";
    } else {
      css_value = "none";
    }

    $(config.element_selector + "[" + config.element_identifier + "='" + config_key + "']").css(config.css_property, css_value);
  }
}

const load_all_config = (params) => {
  let config, config_element, json_obj, config_key, css_value;
  for (let config_obj in params.config_array) {
    config = params.config_array[config_obj];
    config_element = config.config_element;
    default_config({config_element});

    json_obj = JSON.parse(localStorage.getItem(config_element));
    for(config_key in json_obj) {
      $(config.config_selector + "[" + config.config_identifier + "='" + config_key + "']").prop(config.config_attribute, json_obj[config_key]);

      if(config.css_property === "display" && json_obj[config_key] === true) {
        css_value = "block";
      } else {
        css_value = "none";
      }

      $(config.element_selector + "[" + config.element_identifier + "='" + config_key + "']").css(config.css_property, css_value);
    }
  }
}

const default_config = (params) => {
  const config_element = params.config_element;
  if(localStorage.getItem(config_element) === undefined) {
    let json_obj;
    switch (config_element) {
      case "info-select-config":
        json_obj = {"account": true, "bill_cycle": true, "budget_billing": true, "credit_ranking": true, "first_name": true, "last_invoice": true, "last_payment": true, "last_name": true, "meter_type": false, "next_cycle": true, "outage_notif": true, "pap": true, "paperless": true, "service": true};
        break;
      case "info-pos-config":
        json_obj = {"account": 1, "bill_cycle": 2, "budget_billing": 3, "credit_ranking": 4, "first_name": 5, "last_invoice": 6, "last_payment": 7, "last_name": 8, "meter_type": 9, "next_cycle": 10, "outage_notif": 11, "pap": 12, "paperless": 13, "service": 14};
        break;
    }

    localStorage.setItem(config_element, JSON.stringify(json_obj));
  }
}

const info_config_save = ()=> {
  let json_obj = {};
  $(".page-sidebar-wrapper .info-modal .mt-checkbox input[type='checkbox']").each(function() {
    json_obj[$(this).attr("name")] = $(this).prop("checked");
  });

  localStorage.setItem("info-select-config", JSON.stringify(json_obj));
  console.log(localStorage);
}
