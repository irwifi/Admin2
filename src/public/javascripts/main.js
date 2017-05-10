"use strict";
$(document).ready(function() {
  // To clear the localStorage Cache
  // localStorage.clear();

  const config_info_pos = {"config_element": "info-pos-config",  "config_selector": ".page-sidebar-wrapper .info .sub-menu .nav-item", "config_identifier": "data-config", "config_attribute": "data-pos", "element_parent": ".page-sidebar-wrapper .info .sub-menu", "element_selector": ".nav-item", "element_identifier": "data-pos"};
  const config_info_select = {"config_element": "info-select-config", "config_selector": ".page-sidebar-wrapper .info-modal .mt-checkbox input[type='checkbox']", "config_identifier": "name", "config_property": "checked", "element_selector": ".page-sidebar-wrapper .info .sub-menu .nav-item", "element_identifier": "data-config", "css_property": "display"};
  const config_xray = {"config_element": "xray-config",  "config_selector": ".page-sidebar-wrapper .xray-view input[type='checkbox']", "config_identifier": "name", "config_property": "checked"};
  const config_array = [config_info_pos, config_info_select, config_xray];
  load_all_config({config_array});
  // console.log(localStorage);

  $( ".sortable" ).sortable({
    update: (event, ui) => {
      let counter = 0, json_obj = {};
      $(".page-sidebar-wrapper .info .sub-menu .nav-item").each(function() {
        counter++;
        $(this).attr("data-pos", counter);

        json_obj[$(this).attr("data-config")] = $(this).attr("data-pos");
      });
      localStorage.setItem("info-pos-config", JSON.stringify(json_obj));
      // Saving configuration combilned in the loop so separate configuration save is not necessary
      // config_save({"config_element": "info-pos-config", "config_selector": ".page-sidebar-wrapper .info .sub-menu .nav-item", "element_identifier": "data-config", "config_attribute": "data-pos"});
    }
  });

  toggle_tooltips();

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
    config_save({"config_element": "info-select-config", "config_selector": ".page-sidebar-wrapper .info-modal .mt-checkbox input[type='checkbox']", "element_identifier": "name", "config_property": "checked"});
  });

  $(".page-sidebar-wrapper .info-modal").on('hide', () => {
    load_config({"config": config_info_select});
  });

  $(".page-sidebar-wrapper .xray-view input[name='xray']").on("change", () => {
    config_save({"config_element": "xray-config", "config_selector": ".page-sidebar-wrapper .xray-view input[type='checkbox']", "element_identifier": "name", "config_property": "checked"});
    toggle_tooltips();
  });
})

const toggle_tooltips = () => {
  if($(".page-sidebar-wrapper .xray-view input[type='checkbox'][name='xray']").is(':checked')) {
    $(".page-sidebar-wrapper .info .sub-menu .nav-item .title").removeClass("blank");
    $(".page-sidebar-wrapper .info .sub-menu .nav-item .title.tooltips").each(function() {
      $(this).attr("data-original-title", $(this).attr("data-tooltip"));
    });
  } else {
    $(".page-sidebar-wrapper .info .sub-menu .nav-item .title").addClass("blank");
    $(".page-sidebar-wrapper .info .sub-menu .nav-item .title.tooltips").attr("data-original-title", "");
  }
}

// Sort the Info elements
const info_sorting = (params) => {
  $(params.config.element_parent + " " + params.config.element_selector).sort(function (a, b) {
    return +a.getAttribute(params.config.element_identifier) - +b.getAttribute(params.config.element_identifier);
  }).appendTo( params.config.element_parent );
}

const load_config = (params) => {
  let config_key, css_value;
  const config = params.config;
  // If the configuration do not already exist load the default one
  default_config({"config_element": config.config_element});
  const json_obj = JSON.parse(localStorage.getItem(config.config_element));

  for(config_key in json_obj) {
    if(config.config_property !== undefined) {
      $(config.config_selector + "[" + config.config_identifier + "='" + config_key + "']").prop(config.config_property, json_obj[config_key]);
    } else if(config.config_attribute !== undefined) {
      $(config.config_selector + "[" + config.config_identifier + "='" + config_key + "']").attr(config.config_attribute, json_obj[config_key]);
    }

    if(config.css_property === "display") {
      display_config_apply({"element_selector": config.element_selector, "element_identifier": config.element_identifier, config_key, "config_value": json_obj[config_key]});
    }
  }
}

const display_config_apply = (params) => {
  let css_value;
    if(params.config_value === true) {
      css_value = "block";
    } else {
      css_value = "none";
    }

  $(params.element_selector + "[" + params.element_identifier + "='" + params.config_key + "']").css("display", css_value);
}

const load_all_config = (params) => {
  let config, config_element, json_obj, config_key, css_value;
  for (let config_obj in params.config_array) {
    config = params.config_array[config_obj];
    load_config({config});
    if(config.config_element === "info-pos-config") {
      info_sorting({config});
    }
  }
}

const default_config = (params) => {
  const config_element = params.config_element;
  if(localStorage.getItem(config_element) === undefined || localStorage.getItem(config_element) === null) {
    let json_obj;
    switch (config_element) {
      case "info-select-config":
        json_obj = {"account": true, "bill_cycle": true, "budget_billing": true, "credit_ranking": true, "first_name": true, "last_invoice": true, "last_payment": true, "last_name": true, "meter_type": false, "next_cycle": true, "outage_notif": true, "pap": true, "paperless": true, "service_pwr": true, "service_wtr": true};
        break;
      case "info-pos-config":
        json_obj = {"account": 10, "bill_cycle": 13, "budget_billing": 4, "credit_ranking": 3, "first_name": 1, "last_invoice": 11, "last_payment": 12, "last_name": 2, "meter_type": 15, "next_cycle": 14, "outage_notif": 9, "pap": 5, "paperless": 6, "service_pwr": 7, "service_wtr": 8};
        break;
      case "xray-config":
        json_obj = {"xray": false};
        break;
      default:
        break;
    }
    localStorage.setItem(config_element, JSON.stringify(json_obj));
  }
}

const config_save = (params)=> {
  let json_obj = {};
  $(params.config_selector).each(function() {
    if(params.config_property) {
      json_obj[$(this).attr(params.element_identifier)] = $(this).prop(params.config_property);
    } else if(params.config_attribute) {
      json_obj[$(this).attr(params.element_identifier)] = $(this).attr(params.config_attribute);
    }
  });

  localStorage.setItem(params.config_element, JSON.stringify(json_obj));
}