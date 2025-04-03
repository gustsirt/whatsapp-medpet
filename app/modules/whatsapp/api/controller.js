import Service from "../logic/service.js";

const service = new Service()

export default class Controller {
  constructor(service) {
    this.service = service;
  }
}