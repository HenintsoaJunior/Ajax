function createHTTPRequest()
{
    try
    {
        // try returns a HTTPRequest older versions of Internet Explorer
        return new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (e) 
    {
        try
        {
            // same thing here
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (e2) 
        {
            // return current standard HTTPRequest
            return new XMLHttpRequest();
        }
    }
}

function sendHTTPRequest(method, filename, body, callback)
{
    const request = createHTTPRequest();
    
    // set callback
    request.onreadystatechange  = () => {
        if(request.readyState == 4)
        { callback(request); }
    };
    
  //XMLHttpRequest.open(method, url, async)
   request.open(method, filename,  true); 

   //XMLHttpRequest.send(body)
   request.send(body); 
}

function textNode(text)
{ return document.createTextNode(text); }

function newNode(tagname, attributes = {}, children)
{
    const node = document.createElement(tagname);
    
    for(let attribute in attributes)
    {
        const attrs = attribute.split(",");
        for(let attr of attrs)
        { node.setAttribute(attr, attributes[attribute]); }
    }
    
    for(let child of children)
    { node.append(child); }
    
    return node;
}

function newTR(object, keys = null, attributes = {})
{
    const tds = [];
    
    if(keys == null)
    {
        for(let key in object)
        { tds.push(newNode("td", {}, [ textNode(object[key]) ])); }
    }
    else
    {
        for(let key of keys)
        { tds.push(newNode("td", {}, [ textNode(object[key]) ])) }
    }
    
    return newNode("tr", attributes, tds);
}

function getId(id)
{ return document.getElementById(id); }

function getQuery(query)
{ return document.querySelector(query); }

function getAllQuery(query)
{ return document.querySelectorAll(query); }