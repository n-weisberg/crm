package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Employee struct {
	Name    string
	Phone   []string
	Address string
	Created string
	Wage    float32
}

type Job struct {
	Client    Client
	Estimate  Estimate
	Date      []string
	Employees []Employee
}

type Estimate struct {
	Date   string
	Time   string
	Type   string
	Notes  []string
	Amount float32
}

var employees []Employee = []Employee{
	{"Nick", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", 15.0},
	{"Ben", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", 16.0},
	{"Alyanna", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", 17.0},
	{"Tyler", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", 16.0},
	{"Ruslan", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", 16.0},
}

func main() {
	http.HandleFunc("/getClients", GetClients)
	http.HandleFunc("/employees", Employees)
	http.HandleFunc("/addClient", AddClient)
	http.HandleFunc("/editClient", EditClient)
	http.HandleFunc("/deleteClient", DeleteClient)
	fmt.Println("Server started at port 3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func Employees(w http.ResponseWriter, r *http.Request) {

	js, err := json.Marshal(employees)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
