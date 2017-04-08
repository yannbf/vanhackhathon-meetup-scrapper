import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetupData {

  private baseUrlV1 = "https://api.meetup.com/";
  private baseUrlV2 = "https://api.meetup.com/2/";
  private apiKey    = "756f3d3c2c633b7fb272d1b2f367c70";

  CATEGORIES = {
    ART_AND_CULTURE      : 1,
    BUSINESS             : 2,
    VEHICLES             : 3,
    COMMUNITY            : 4,
    DANCE                : 5,
    EDUCATION            : 6,
    FASHION              : 8,
    FITNESS              : 9,
    FOOD_AND_DRINK       : 10,
    GAMES                : 11,
    LGBT                 : 12,
    POLITICS             : 13,
    HEALTH               : 14,
    ARTCRAFT             : 15,
    FOREIGN_LANGUAGE     : 16,
    LIFESTYLE            : 17,
    READING_CLUB         : 18,
    CINEMA               : 20,
    MUSIC                : 21,
    SPIRITUALITY         : 22,
    OUTDOORS             : 23,
    PARANORMAL           : 24,
    MOMS_AND_DADS        : 25,
    PETS                 : 26,
    PHOTOGRAPHY          : 27,
    RELIGION             : 28,
    SCI_FI_AND_FANTASY   : 30,
    SINGLES              : 30,
    SOCIALIZING          : 31,
    SPORTS               : 32,
    SUPPORT              : 33,
    TECH                 : 34,
    WRITING              : 36,
  }

  constructor(public http: Http, public jsonp: Jsonp) { }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }

      // Needed params to make the request
      p.set('key'   , this.apiKey);

      // For jsonp calls so we don't have cors issues
      p.set('callback', 'JSONP_CALLBACK');

      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.jsonp.request(endpoint, options).map(res => res.json());
  }

  getMeetups(city): any {
    let params = {
      city     : city,
      category : this.CATEGORIES.TECH,
      page     : 10,
    }

    return this.get(this.baseUrlV2 + 'open_events', params);
  }

  getMeetupGroups(topic): any{
    let params = {
      text     : topic,
      order    : 'newest',
      radius   : 'global',
      category : this.CATEGORIES.TECH,
    }

    let endpoint = "find/groups"
    return this.get(this.baseUrlV1 + endpoint, params);
  }

}
