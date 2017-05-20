
// This JS file ensures that a particular query string ('sourcequery'), persists on links for scores page

var GNS = window.GNS || {};
GNS.PersistQueryString = {

    returnUrl: function() {
        return this.url;
    }, 

    addQueryStringtoLinks: function ( url, links_to_persist ) {
        if ( url ) {
            $( links_to_persist ).each(function() {
                var $this = $(this);       
                var _href = $this.attr( "href" ); 
                if ( _href ) {
                    var character = _href.indexOf('?') == -1 ? '?' : '&';
                    $this.attr( "href", _href + character + url );
                }
            })
        }
        this.url = url ? url : '';
    }, 

    buildQueryString: function ( vars, query_persist, links_to_persist ) {
        var url;
        for ( var key in vars ) {
            if ( key == query_persist ) {
                url = key + '=' + vars[key];
            }
        }
        this.addQueryStringtoLinks( url, links_to_persist );
    },

    parseQueryString: function ( query_persist, links_to_persist ) {
        var vars = {}, hash;
        var query_string = document.URL.split('?')[1];
            
        if ( query_string != undefined ) {
            query_string = query_string.split('&');
            for ( var i = 0; i < query_string.length; i++ ) {
                hash = query_string[i].split('=');
                vars[hash[0]] = hash[1];
            }
        }
        this.buildQueryString( vars, query_persist, links_to_persist );
    }
}

GNS.PersistQueryString.parseQueryString( 'querystring', 'links you want to add it to' );