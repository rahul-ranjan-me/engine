define([], 
	function() {

        function dollor(val){
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

	    return  { 
            name: {
                label:'Name',
                id: 'name',
                width:'35%',
                sort : true
            },
            type: {
                label:'Type',
                id: 'type',
                width:'15%',
                sort : true
            },
            region: {
                label:'Region',
                id: 'region',
                width:'25%',
                sort : true
            },
            institutionType: {
                label:'Institution Type',
                id: 'institutionType',
                width:'25%',
                sort : true
            }
        };

	}
);