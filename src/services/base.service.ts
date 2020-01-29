class BaseService {
  private model: any;
  private key: any;
  constructor(model: any, key: any) {
    this.model = model;
    this.key = key;
  }

  public async save(data: any) {
    try {
      const res = await this.model.create(data);
      return res;
    } catch (error) {
      throw error;
    }
  }

  public async read(id: any, populate?: any) {
    try {
      var filter = {};
      filter[this.key] = id;
      let res;
      if (populate) {
        res = await this.model.findOne(filter).populate(populate);
      } else {
        res = await this.model.findOne(filter);
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: any) {
    try {
      const filter = {};
      filter[this.key] = id;
      const res = await this.model.deleteOne(filter);
      return res;
    } catch (error) {
      throw error;
    }
  }
  public async find(query?: any, options?: any) {
    try {
      const res = await this.model.paginate(query, options);
      return res;
    } catch (error) {
      throw error;
    }
  }

  public update(id: any, data: any) {
    var filter = {};
    filter[this.key] = id;

    return this.model
      .findOne(filter)
      .then(modelInstance => {
        for (var attribute in data) {
          if (
            data.hasOwnProperty(attribute) &&
            attribute !== this.key &&
            attribute !== '_id'
          ) {
            modelInstance[attribute] = data[attribute];
          }
        }

        return modelInstance.save();
      })
      .then(modelInstance => modelInstance)
      .catch(error => error);
  }
}

export default BaseService;
