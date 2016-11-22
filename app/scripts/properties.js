define([], 
	function() {
	    var context = 'json/';


	    	// prodURL = 'https://markitlabs.markit.com/RecommendsService/services/'
	    	// devURL = 'http://lon6slsdvwww001:8080/RecommendsService/services/'
	    	// localURL = http://10.129.11.43:8080/RecommendsService/services/

	    	

	    	/* **** 
	    		Uncomment for Local app 
	    	**** */
	    	var prodContext = 'http://lon6slsdvwww001:8080/RecommendsService/services/',
	    	devContext = {
	    		DomainURL : 'http://localhost:4200/',
	    		application : 'mConnect/login.html',
	    		tenant : 'markit.onmicrosoft.com',
	    		contextRoot : 'http://localhost:4200/#/',
	    		redirectUri : 'http://localhost:4200/#/'
	    	};


	    	/* **** 
	    		Uncomment for dev box build 
	    	**** */
	    	// var prodContext = '/RecommendsService/services/',
	    	// devContext = {
	    	// 	DomainURL : 'http://lon6slsdvwww001:8080/Recommends/',
	    	// 	application : 'mConnect/login.html',
	    	// 	tenant : 'markit.onmicrosoft.com',
	    	// 	contextRoot : 'http://lon6slsdvwww001:8080/Recommends/#/',
	    	// 	redirectUri : 'http://lon6slsdvwww001:8080/Recommends/#/'
	    	// };


	    	/* **** 
	    		Uncomment for production build 
	    	**** */
	    	// var prodContext = '/RecommendsService/services/',
	    	// devContext = {
	    	// 	DomainURL : 'https://markitlabs.markit.com/Recommends/',
	    	// 	application : 'mConnect/login.html',
	    	// 	tenant : 'markit.onmicrosoft.com',
	    	// 	contextRoot : 'https://markitlabs.markit.com/Recommends/#/Summary',
	    	// 	redirectUri : 'https://markitlabs.markit.com/Recommends/#/Summary'
	    	// };

	 //    return {
	 //    	// 'performLogin' : prodContext+'login',
	 //    	'performLogin' : context+'login.json',
	 //    	'user' : prodContext+'security/v1/user',
	 //    	// 'getProductRecommendation' : context+'productrecommendations.json',
	 //    	'getProductRecommendation' : prodContext+'summary/v1/productrecommendations',
	 //    	// 'getLeadCount' : context+'leadCount.json'
	 //    	'getLeadCount' : prodContext+'summary/v1/leadcount',
	 //    	'getLeadPrediction' : prodContext+'summary/v1/leadpredictions',
	 //    	'getRenewals' : prodContext+'/summary/v1/renewals',
	 //    	'getRenewalProducts' : prodContext+'summary/v1/products/renewals',
	 //    	'getFilterdData' : prodContext+'rbc/v1/filters',
	 //    	'doClientNameSearch' : prodContext+'/rbc/v1/clientnames',
	 //    	'doRecommClientSearch' : prodContext+'rbc/v1/clientsummary',
	 //    	'getClientDetails' : prodContext+'rbc/v1/clientdetails',
	 //    	'getRecommendedProduct' : prodContext+'rbc/v1/product/recommendations',
	 //    	'getSimilarClientsProducts' : prodContext+'rbc/v1//similarclients/products',
	 //    	'getSimilarClientsAttributes' : prodContext+'rbc/v1//similarclients/attributes',
	 //    	'similarClientSales' : prodContext+'rbc/v1/productsales',
	 //    	'getProductSales' : prodContext+'rbc/v1/productsales/clients',
	 //    	'getRecommendationType' : prodContext+'executive/summary/v1/recommendations/type',
	 //    	'getRecommendationTop' : prodContext+'executive/summary/v1/recommendations/top',
	 //    	'getRecommendationRegion' : prodContext+'executive/summary/v1/recommendations/region',
	 //    	'getRecommendationProducts' : prodContext+'executive/summary/v1/recommendations/top/products',
	 //    	'getRecommendationProductDetails' : prodContext+'executive/summary/v1/recommendations/productdetails',
	 //    	'getNotes' : context+'notes.json',
	 //    	'context' : devContext,
	 //    	'connectURL' : 'http://lon6slsdvwww001:8080/MarkitConnect/#/connection/'
		// }

			return {
		    	// 'performLogin' : prodContext+'login',
		    	'performLogin' : context+'login.json',
		    	'user' : 'json/user.json',
		    	// 'getProductRecommendation' : context+'productrecommendations.json',
		    	'getProductRecommendation' : 'json/getProductRecommendation.json',
		    	// 'getLeadCount' : context+'leadCount.json'
		    	'getLeadCount' : 'json/getLeadCount.json',
		    	'getLeadPrediction' : 'json/getLeadPrediction.json',
		    	'getRenewals' : '/json/getRenewals.json',
		    	'getRenewalProducts' : 'json/getRenewalProducts.json',
		    	'getFilterdData' : 'json/getFilterdData.json',
		    	'doClientNameSearch' : '/json/doClientNameSearch.json',
		    	'doRecommClientSearch' : 'json/doRecommClientSearch.json',
		    	'getClientDetails' : 'json/getClientDetails.json',
		    	'getRecommendedProduct' : 'json/getRecommendedProduct.json',
		    	'getSimilarClientsProducts' : 'json/getSimilarClientsProducts.json',
		    	'getSimilarClientsAttributes' : 'json/getSimilarClientsAttributes.json',
		    	'similarClientSales' : 'json/similarClientSales.json',
		    	'getProductSales' : 'json/getProductSales.json',
		    	'getRecommendationType' : 'json/getRecommendationType.json',
		    	'getRecommendationTop' : 'json/getRecommendationTop.json',
		    	'getRecommendationRegion' : 'json/getRecommendationRegion.json',
		    	'getRecommendationProducts' : 'json/getRecommendationProducts.json',
		    	'getRecommendationProductDetails' : 'json/getRecommendationProductDetails.json',
		    	'getNotes' : context+'notes.json',
		    	'context' : devContext,
		    	'connectURL' : 'http://lon6slsdvwww001:8080/MarkitConnect/#/connection/'
			}

	}
);