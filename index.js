const express = require("express");
const app = express();
const port = 3000;
var axios = require("axios");

const dulieu_xoatrung = require("./dulieu_xoatrung.json");
const loai = require("./loai.json");
const dulieucanthem = require("./dulieu_canthem.json");
const dulieu_cansua = require("./dulieu_cansua.json");

let listfile = [
  "CA_NTB_1",
  "DVDK_DL_BB_1",
  "DVDK_DT_BB_1",
  "DVDK_DL_BTB_1",
  "DVDK_DL_BTB_1",
  "DVDK_DL_NB_1",
  "DVDK_DL_NTB_1",
  "DVDK_DT_BB_1",
  "DVDK_DT_BTB_1",
  "DVDK_DT_NB_1",
  "DVDK_DT_NTB_1",
  "GX_DL_BB_1",
  "GX_DL_BTB_1",
  "GX_DL_NB_1",
  "GX_DL_NTB_1",
  "GX_DT_BB_1",
  "GX_DT_BTB_1",
  "GX_DT_NB_1",
  "GX_DT_NTB_1",
  "NT_DL_BB_1",
  "NT_DL_BTB_1",
  "NT_DL_NB_1",
  "NT_DL_NTB_1",
  "NT_DT_BB_1",
  "NT_DT_BTB_1",
  "NT_DT_NB_1",
  "NT_DT_NTB_1",
];

app.get("/", (req, res) => {
  let data_nhap = [];

  dulieu_xoatrung.map((item) => {
    let check = false;
    loai.map((itemloai) => {
      if (item.TenKhoaHoc.trim() === itemloai.TenKhoaHoc.trim()) {
        check = true;
      }
      /* if (listfile.includes(item.FileName)) {
        check = true;
      } */
    });
    if (!check) {
      data_nhap.push(item);
    }
  });

  res.send(data_nhap);
});

/* app.get("/", async (req, res) => {
  let data_nhap = [];

  let count = 0;

  await Promise.all(
    dulieucanthem.map(async (item) => {
      var data = JSON.stringify({
        Ten: item.Name || "",
        TenKhoaHoc: item.TenKhoaHoc,
        ChiID: null,
      });

      var config = {
        method: "post",
        url: "https://csdldieutra.tandan.com.vn/csdlapi/Loai",
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+MCMuZnxjc2RsbWVtYmVyc2hpcHByb3ZpZGVyfGFkbWluLDAjLmZ8Y3NkbG1lbWJlcnNoaXBwcm92aWRlcnxhZG1pbiwxMzI1MTA1MjA3NjI2MDk2NjgsVHJ1ZSxRS0IzVnR0NEdEZHRFbGwwYU8ycmNQSmVwVHNWdkx3eHQ2eDAxQXkvTE5PSzg3cUI2cHhpYW9UZmhHcWJXQmpRRDduT3BjbFplNktXUU96cHRIUXRQNThjMVZScUFCVm9xSGw1Vkh3MThZYW41eXYweDlOYzlZWEg4UU02T0Nlb0YyUkxTNWx6UWJKZ2ZtYmN4L2VVeHlGZHRJdkE3bm9oRHduUTFya2hxS0pjQWRuUkl6dnUwV2lxM1RlZDZOUWFjMGZRMHoxeGFZSmVKcEJ2dDhtNnArK1dwem5NK0dHdnJrdkVCL3ZjaDdVQWlyY1RtbldGRk5QZWhLekI2K0tzNjFLYW5xSVNTY3dnd3JkTHBKc3F2THpuUTRIemNBdGdPVHpZS3RYTEF0QzlPZ3ZqUGQ5d3ZYWUcyY1RpQXJxYXQyM2dqNHJJVEx0YjFKS0lQRVk5R2c9PSxodHRwczovL2NzZGxkaWV1dHJhLnRhbmRhbi5jb20udm4vPC9TUD4=",
        },
        data: data,
      };

      let tmp = await axios(config);
      if (tmp.data) {
        count++;
      }
    })
  );

  res.send(dulieucanthem);
}); */

/* app.get("/", async (req, res) => {
  let data_nhap = [];

  let count = 0;

  await Promise.all(
    dulieu_cansua.map(async (item) => {
      var data = JSON.stringify({
        Ten: item.Ten.trim(),
        TenKhoaHoc: item.TenKhoaHoc.trim(),
        ChiID: item.ChiID,
      });

      console.log(data);

      var config = {
        method: "put",
        url: `https://csdldieutra.tandan.com.vn/csdlapi/Loai/${item.ID}`,
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+MCMuZnxjc2RsbWVtYmVyc2hpcHByb3ZpZGVyfGFkbWluLDAjLmZ8Y3NkbG1lbWJlcnNoaXBwcm92aWRlcnxhZG1pbiwxMzI1MTA1MjA3NjI2MDk2NjgsVHJ1ZSxRS0IzVnR0NEdEZHRFbGwwYU8ycmNQSmVwVHNWdkx3eHQ2eDAxQXkvTE5PSzg3cUI2cHhpYW9UZmhHcWJXQmpRRDduT3BjbFplNktXUU96cHRIUXRQNThjMVZScUFCVm9xSGw1Vkh3MThZYW41eXYweDlOYzlZWEg4UU02T0Nlb0YyUkxTNWx6UWJKZ2ZtYmN4L2VVeHlGZHRJdkE3bm9oRHduUTFya2hxS0pjQWRuUkl6dnUwV2lxM1RlZDZOUWFjMGZRMHoxeGFZSmVKcEJ2dDhtNnArK1dwem5NK0dHdnJrdkVCL3ZjaDdVQWlyY1RtbldGRk5QZWhLekI2K0tzNjFLYW5xSVNTY3dnd3JkTHBKc3F2THpuUTRIemNBdGdPVHpZS3RYTEF0QzlPZ3ZqUGQ5d3ZYWUcyY1RpQXJxYXQyM2dqNHJJVEx0YjFKS0lQRVk5R2c9PSxodHRwczovL2NzZGxkaWV1dHJhLnRhbmRhbi5jb20udm4vPC9TUD4=",
        },
        data: data,
      };

      let tmp = await axios(config);
      if (tmp.data) {
        count++;
      }
    })
  );

  res.send(dulieu_cansua);
}); */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
