import { url } from "../constants/apiUrl";
import Api from "./api";

class TestService extends Api {
  public api: Api;
  public URL = url.test;

  constructor() {
    super();

    this.api = new Api();

    this.getLoadData = this.getLoadData.bind(this);
  }

  getLoadData() {
    try {
      return this.ajax("get", this.URL, "/users").then((res: any) => {
        return res.data;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TestService();
