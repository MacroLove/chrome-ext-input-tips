var $ = require('jquery');

(function () {
    var $container = $(".js-shortcodes");
    chrome.storage.local.get('_saved_codes', function(valueArray) {
        console.log(valueArray);
        if( valueArray._saved_codes ){
            var shortcodes = JSON.parse(valueArray._saved_codes);
            for (var k in shortcodes) {
                var $col = $('<div class="col-sm-3"></div>')
                ,   $code = $('<div class="shortcode"></div>')
                ,   $codeText = $('<span></span>')
                ,   $codeIcon = $('<i></i>')
                ,   $delIcon = $('<img id="btn-del-item' + k + '" src="img/ic_delete.png" alt="' + k + '"/>');
        
                $delIcon.on('click', function() {
                    console.log('Delete key: ' + this.id);
                    var key = this.id.replace(/btn-del-item/, '');
                    chrome.storage.local.get('_saved_codes', function(valueArray) {
                        var saved = {};
                        if( valueArray._saved_codes ){
                            saved = JSON.parse(valueArray._saved_codes);
                        }
                        delete saved[key];
                        chrome.storage.local.set({'_saved_codes': JSON.stringify(saved)}, function() {
                            window.location.reload();
                        });
                    });
                });

                $codeText.text(k);
                $codeIcon.html(shortcodes[k]);
        
                $code.append($codeText, $codeIcon, $delIcon);
                $col.append($code);
                $container.append($col);
            }        
        }
    });

    $(".editor").one("focus", function () {
        $(this).html("");
    });

    document.getElementById('btn-save').onclick = function(){
        var str = document.getElementById("editor").value;
        if(str && str.trim()){
            var lines = str.trim().split('\n');
            var codeMap = {};
            for (var c of lines) {
                if (c.indexOf(':') != -1) {
                    var k = c.split(':')[0].trim();
                    var v = c.split(':')[1].trim();
                    codeMap[k] = v;
                }
            }
            chrome.storage.local.get('_saved_codes', function(valueArray) {
                var saved = {};
                if( valueArray._saved_codes ){
                    saved = JSON.parse(valueArray._saved_codes);
                }
                saved = Object.assign(saved, codeMap);
                chrome.storage.local.set({'_saved_codes': JSON.stringify(saved)}, function() {
                    // chrome.runtime.reload();
                    window.location.reload();
                });
            });
        }
    }
    
})();

