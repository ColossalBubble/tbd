//Utils!

import $ from 'jquery';

function showErrorMessage(appendTo, message, id) {
  $(appendTo)
    .append('<div id='+ '"'+id+ '"' + '>'+ message+' </div>')
    .hide()
    .fadeIn(999)
    .fadeOut(999)
    .queue(next => {
      $(`#${id}`).remove();
      next();
    });
}



function addKeyHelper(id){

    $("#UserMakeInstrumentRoom").append(`
        <div class="selectKey" id="selectKeys_${id}"> 
          Select a Key:<form>
            <select name="cars">
              <option value="A">A</option>
              <option value="S">S</option>
              <option value="D">D</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>

            </select>
          </form>

        <form>
        Select Some parameters SoundParam1: <input type="text"  /><br>
        SoundParam2: <input type="text"  /><br>
        SoundParam3: <input type="text"  /><br>
        SoundParam4: <input type="text"  />
        </form>
        <button id ="sampleSound_${id}" class='sampleSound'>Sample sound !</button>
      </div>`);
}

module.exports.showErrorMessage=showErrorMessage;
module.exports.addKeyHelper=addKeyHelper;
