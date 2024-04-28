import http from "./httpService";

const apiEndpoint = "/company";

function LeadUrl(id) {
  return `${apiEndpoint}/leads/${id}`;
}

export function getLeads() {
  return http.get(`${apiEndpoint}/leads/`);
}

export function getLead(leadId) {
  return http.get(LeadUrl(leadId));
}

export function saveLead(lead) {
  if (lead._id) {
    const body = { ...lead };
    delete body._id;
    return http.put(LeadUrl(lead._id), body);
  }
  return http.post(`${apiEndpoint}/leads/`, lead);
}

export function deleteMovie(leadId) {
  return http.delete(LeadUrl(leadId));
}
