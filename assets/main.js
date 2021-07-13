$(function () {
  var client = ZAFClient.init();
  client.invoke("resize", { width: "100%", height: "80px" });

  client.get("ticket.organization.id").then(function (data) {
    var org_id = data["ticket.organization.id"];
    requestOrgInfo(client, org_id);
    requestRelatedOrgInfo(client, org_id);
  });
});

function showInfo(data) {
  var slingshot = {
    name: data.organization.name,
    details: data.organization.details,
    notes: data.organization.notes,
  };

  var source = $("#organization-template").html();
  var template = Handlebars.compile(source);
  var html = template(slingshot);
  $("#content").html(html);
}

function showError(response) {
  var error_data = {
    status: response.status,
    statusText: response.statusText,
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

function requestOrgInfo(client, id) {
  var settings = {
    url: "/api/v2/organizations/" + id + ".json",
    type: "GET",
    dataType: "json",
  };

  client.request(settings).then(
    function (data) {
      showInfo(data);
    },
    function (response) {
      showError(response);
    }
  );
}

function requestRelatedOrgInfo(client, id) {
  var settings = {
    url: "/api/v2/organizations/" + id + "related.json",
    type: "GET",
    dataType: "json",
  };

  client.request(settings).then(
    function (data) {
      console.log(data);
    },
    function (response) {
      console.error(response);
    }
  );
}

/*
   fetch organization information from Zendesk rest API
   make request to Show Organization endpoint
     GET /api/v2/organizations/{id}.json
     'name', 'details', 'notes'
   make request to Show Organization's Related Data
     GET /api/v2/organizations/{id}/related.json
     'users_count', 'tickets_count'

    tutorial: https://develop.zendesk.com/hc/en-us/articles/360001074848-Build-your-first-Support-app-Part-4-Getting-data

  
  next steps: show open ticket count/ recent ticket count


*/
