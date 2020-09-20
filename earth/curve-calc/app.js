// Generated by LiveScript 1.5.0
(function(){
  var FEETPERMETRE, MILESPERKM, EARTHRADIUSKM, UNITS, unitId;
  window.log = function(){
    return console.log.apply(console, arguments);
  };
  FEETPERMETRE = 3.2808;
  MILESPERKM = 0.621371192237;
  EARTHRADIUSKM = 6371;
  UNITS = {
    imperial: {
      minor: {
        name: 'feet',
        factor: 1 / FEETPERMETRE,
        'switch': FEETPERMETRE
      },
      major: {
        name: 'miles',
        factor: 1 / MILESPERKM,
        'switch': MILESPERKM
      }
    },
    metric: {
      minor: {
        name: 'metres',
        factor: 1,
        'switch': 1 / FEETPERMETRE
      },
      major: {
        name: 'km',
        factor: 1,
        'switch': 1 / MILESPERKM
      }
    }
  };
  initialise();
  calculate();
  $('input').on('keypress', function(it){
    if ((it.key || it.keyIdentifier) === 'Enter') {
      return calculate();
    }
  });
  $('#btnCalculate').on('click', calculate);
  $('#metric,#imperial').on('click', function(it){
    return switchUnit(it.target.value);
  });
  $('form').on('submit', function(it){
    return it.preventDefault();
  });
  function calculate(){
    var h1, h2, unit, h1_km, h2_km, d1_km, d2_km, d1, d, qs;
    h1 = getVal('h1');
    h2 = getVal('h2');
    unit = UNITS[unitId];
    h1_km = h1 * unit.minor.factor * 0.001;
    h2_km = h2 * unit.minor.factor * 0.001;
    d1_km = getHorizonDistance_km(h1_km);
    d2_km = getHorizonDistance_km(h2_km);
    d1 = d1_km / unit.major.factor;
    d = (d1_km + d2_km) / unit.major.factor;
    $('#d1').text(d1.toFixed(2));
    $('#d').text(d.toFixed(2));
    qs = queryString.stringify({
      h1: h1,
      h2: h2,
      unit: unitId
    });
    return history.replaceState(void 8, "", "?" + qs);
  }
  function getHorizonDistance_km(h0_km){
    return Math.sqrt(Math.pow(h0_km, 2) + 2 * EARTHRADIUSKM * h0_km);
  }
  function getTargetHiddenHeight_km(d2_km){
    if (d2_km < 0) {
      return 0;
    }
    return Math.sqrt(Math.pow(d2_km, 2) + Math.pow(EARTHRADIUSKM, 2)) - EARTHRADIUSKM;
  }
  function getVal(it){
    return parseFloat($("#" + it).val());
  }
  function initialise(){
    var qs, h1, h2, u;
    qs = queryString.parse(location.search);
    $('#h1').val(parseFloat(h1 = qs.h1) ? h1 : '1.75');
    $('#h2').val(parseFloat(h2 = qs.h2) ? h2 : '10');
    return initialiseUnit(UNITS[u = qs.unit] ? u : 'metric');
  }
  function initialiseUnit(it){
    $("input#" + it).prop('checked', true);
    return showUnit(unitId = it);
  }
  function showUnit(it){
    $('.unit-minor .unit').text(UNITS[it].minor.name);
    return $('.unit-major .unit').text(UNITS[it].major.name);
  }
  function switchUnit(it){
    var unit;
    showUnit(unitId = it);
    unit = UNITS[unitId];
    $('#h1').val(unit.minor['switch'] * getVal('h1'));
    $('#h2').val(unit.minor['switch'] * getVal('h2'));
    return calculate();
  }
}).call(this);
