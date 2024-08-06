"use client";
import React, { useEffect } from "react";

//Handle check or not check Allpage
// 1. Event 1: click checkbox of allpage => checked into every page
//2. Event 2: click every page => checked all page
//3. Event 3: disble button
//4. Event 4: click button "Done"

const CheckBox = () => {
  const showAllPage = () => {
    document.addEventListener("click", () => {
      const showPage = document.querySelector(".show-page");
      const removePage = document.querySelector(".form-check-page");
      if (!removePage) {
        showPage.classList.add("form-check-page");
      } else {
        showPage.classList.remove("form-check-page");
      }
    });
  };
  //save checkbox after load page
  useEffect(() => {
    const boxes = document.getElementsByClassName("check").length;
    function save() {
      for (let i = 1; i <= boxes; i++) {
        const checkbox = document.getElementById(String(i));
        localStorage.setItem("checkbox" + String(i), checkbox.checked);
      }
      //for loading
    }
    for (let i = 1; i <= boxes; i++) {
      if (localStorage.length > 0) {
        const checked = JSON.parse(localStorage.getItem("checkbox" + String(i)));
        document.getElementById(String(i)).checked = checked;
      }
      window.addEventListener("change", save);
    }
  }, []);

  useEffect(() => {
    const handleChooseAll = () => {
      const allPageElement = document.getElementById("all");
      const pageCheck = document.querySelectorAll(".check");
      const actionDisabled = document.querySelector(".btn");

      const allPageChecked = Array.from(pageCheck).every((checkbox) => checkbox.checked);
      allPageElement.checked = allPageChecked;
      const anyChecked = Array.from(pageCheck).some((checkbox) => checkbox.checked);
      allPageElement.indeterminate = !allPageChecked && anyChecked;

      actionDisabled.disabled = !anyChecked;
      const updatePageCheckboxes = () => {
        pageCheck.forEach((checkbox) => (checkbox.checked = allPageElement.checked));
      };

      // Sự kiện khi ô "All Page" được kiểm tra hoặc bỏ chọn
      allPageElement.addEventListener(
        "click",
        () => {
          actionDisabled.disabled = !allPageElement.checked;
        },
        updatePageCheckboxes
      );

      allPageElement.addEventListener("click", updatePageCheckboxes);

      // Sự kiện khi bất kỳ ô kiểm tra trang nào được kiểm tra hoặc bỏ chọn
      pageCheck.forEach((checkbox) => checkbox.addEventListener("click", handleChooseAll));
    };

    handleChooseAll();
  }, []);

  return (
    <div className="form-checkbox">
      <div className="all-page">
        <p className="text-all-page" onClick={showAllPage}>
          All pages
        </p>
        <label className="container">
          <input type="checkbox" name="all" id="all" />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="show-page">
        <div className="horizontal">
          <hr />
        </div>
        <div className="item-page">
          <p>Page 1</p>
          <label className="container">
            <input type="checkbox" name="page1" id="1" className="check" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="item-page">
          <p>Page 2</p>
          <label className="container">
            <input type="checkbox" name="page2" id="2" className="check" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="item-page">
          <p>Page 3</p>
          <label className="container">
            <input type="checkbox" name="page3" id="3" className="check" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="item-page">
          <p>Page 4</p>
          <label className="container">
            <input type="checkbox" name="page4" id="4" className="check" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="horizontal">
          <hr />
        </div>
        <button className="btn" onClick={showAllPage}>
          Done
        </button>
      </div>
    </div>
  );
};

export default CheckBox;
