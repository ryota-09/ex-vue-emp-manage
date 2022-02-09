/**
 * 従業員情報を一元管理するためのストア.
 * 
 * @remarks
 *
 */
import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee"
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //従業員数
    totalEmployeeCount: 0,
    //従業員一覧
    employees: new Array<Employee>()
  }, // end state
  /**
     * 従業員一覧情報をWebAPIから取得してmutationを呼び出す.
     * @param context 
     */
  actions: {
    async getEmployeeList(context){
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api/employee/employees"
      );

      console.dir("response" + JSON.stringify(response));

      const payload = response.data;

      context.commit("showEmployeeList",payload);
    }
  }, // end actions
  mutations: {
    /**
     * 従業員一覧情報を作成してstateに格納する.
     * @param state 
     * @param payload 
     */
    showEmployeeList(state, payload){
      state.totalEmployeeCount = payload.totalEmployeeCount;

      for(const employee of payload.employees){
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        )
      }
    }
  }, // end mutations
  getters: {
    /**
     * 従業員数を返す.
     * @param state 
     * @returns 検索IDから絞り込んだ従業員をreturnする
     */
    getEmployeeCount(state){
      return state.totalEmployeeCount;
    },
    getEmployees(state){
      return state.employees;
    },
    getEmployeeByID(state){
      return (serchId: number) => {
        const newArray = [];
        for(const employee of state.employees){
          if ( employee.id == serchId){
            newArray.push(employee);
          }
        }
        return newArray[0]
      }
    }
  }, // end getters
  modules: {}, // end modules
});
