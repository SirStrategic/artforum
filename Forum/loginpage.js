//MADE REDUNDANT BITCHES
//THIS IS THE BIT I FEARED
//will be used for random clientside functions

//generate salt

//salt must be 8 characters long
//if you tamper with these you may never be able to log into that account and I won't be able to help you

// source: http://stackoverflow.com/a/11058858
function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  // source: http://stackoverflow.com/a/11058858
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

function hash(data){
    const digest = crypto.subtle.digest('SHA-256', ArrayBuffer(data + "v7ArvELs"));
}

