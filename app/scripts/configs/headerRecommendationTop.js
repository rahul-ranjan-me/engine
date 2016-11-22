define([], 
	function() {
        function formatMe(data){
            return '$ '+data;
        }

	    return  { 
            clientName: {
                label:'Client Name',
                id: 'clientName',
                width:'40%'
            },
            productFamilyName: {
                label:'Product',
                id: 'productFamilyName',
                width:'30%'
            },
            // newOpportunity: {
            //     label:'Opportunity',
            //     id: 'newOpportunity',
            //     width:'20%',
            //     align:'right',
            //     format: formatMe
            // },
            institutionType: {
                label:'Institution',
                id: 'institutionType',
                width:'30%'
            }
        };

	}
);