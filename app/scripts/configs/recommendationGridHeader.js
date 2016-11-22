define([], 
	function($sce) {

        var likeDislike = function(elem, i, row){
            return $sce.trustAsHtml('<like-dislike clientname="'+row.clientName+'"></like-dislike>');
        }.bind(this);

        return  { 
            clientName: {
                label:'Client Name',
                id: 'clientName',
                width:'30%'
            },
            region: {
                label:'Region',
                id: 'region',
                width:'30%'
            },
            type: {
                label:'Type',
                id: 'type',
                width:'30%'
            },
            likeDislike: {
                label: '.',
                id: 'likeDislike',
                width : '10%',
                formatWithHTML : likeDislike
            }
        };

    }
);