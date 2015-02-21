module.exports = {
  global : {
    base: "http://api.appbase.io/rest_test/v3",
    req: {
      headers: { // request headers
        "appbase-secret": "193dc4d2440146082ea734f36f4f2638",
        "content-type": "application/json"
      }
    },
    res: {
      headers: {  //expected response
        "content-type": "application/json"
      }
    }
  },
  tests: [
    {
      description: "Create/Update Document",
      req: { // request to perform
        url: "/user/laura",
        method: "patch",
        "foo": "bar"
      },
      res: { //expected response
        code: 200,
        body: {
          "_id": "laura", // has to match the exact string
          "_collection": "user",
          "_timestamp": Number, // could be any number
          "foo": "bar"
        }
      }
    },
    {
      description: "Patch Nested Document",
      req: {
        url: "/user/laura",
        method: "patch",
        body: {
          "foo.bar": "bar"
        }
      },
      res: {
        code: 200,
        body: {
          "_id": "laura",
          "_collection": "user",
          "_timestamp": Number,
          "foo": {
            "bar": "bar"
          }
        }
      }
    },
    {
      description: "Delete Properties, add new ones",
      req: {
        url: "/user/laura",
        method: "patch",
        body: {
          "foo": null,
          "bar": "foo"
        }
      },
      res: {
        code: 200,
        body: {
          "_id": "laura",
          "_collection": "user",
          "_timestamp": Number,
          "bar": "foo"
        }
      }
    },
    {
      description: "Get Document",
      req: {
        url: "/user/laura",
        method: "get"
      },
      res: {
        code: 200,
        body: {
          "_id": "laura",
          "_collection": "user",
          "_timestamp": Number,
          "bar": "foo"
        }
      }
    },
    {
      description: "Delete Document",
      req: {
        url: "/user/laura",
        method: "delete"
      },
      res: {
        code: 200,
        body: {
          "_id": "laura",
          "_collection": "user",
          "_timestamp": Number,
          "_deleted": true,
          "bar": "foo"
        }
      }
    },
    {
      description: "Fetching Non-existent document",
      req: {
        url: "/user/laura",
        method: "delete"
      },
      res: {
        code: 404,
        body: {
          error: Number,
          message: String
        }
      }
    },
    {
      description: "Push a JSON without an _id in the collection",
      req: {
        url: "/user",
        method: "post",
        body: {
          "bar": "foo"
        }
      },
      res: {
        code: 200,
        body: {
          "_id": String,
          "_collection": "user",
          "_timestamp": Number,
          "bar": "foo"
        }
      }
    },
    {
      description: "Push a JSON with an _id in the collection ",
      req: {
        url: "/user",
        method: "post",
        body: {
          "_id": "laura",
          "bar": "foo"
        }
      },
      res: {
        code: 200,
        body: {
          "_id": "laura",
          "_collection": "user",
          "_timestamp": Number,
          "bar": "foo"
        }
      }
    }
  ]
}