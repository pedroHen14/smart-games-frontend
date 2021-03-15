import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});

export const mapApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/",
});
