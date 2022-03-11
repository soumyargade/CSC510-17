async function getPullsAPITitles(){

    return [];
}

async function getIssuesAPITitles(){
    return [];
}

async function getRepositoriesAPITitles(){
    return [];
}

async function scrape(searchString, optionalCommand){

    if(!optionalCommand){
        return retrieveAPICall(searchString);
    }
    else if(optionalCommand == 'Shell'){
        return retrieveShellExample(searchString);
    }
    else if(optionalCommand == 'Javascript'){
        return retrieveJavascriptExample(searchString);
    }
    else if(optionalCommand == 'Response'){
        return retrieveResponseBody(searchString);
    }



}
async function retrieveAPICall(searchString){

}

async function retrieveJavascriptExample(searchString){

}

async function retrieveShellExample(searchString){

}

async function retrieveResponseBody(searchString){

}

