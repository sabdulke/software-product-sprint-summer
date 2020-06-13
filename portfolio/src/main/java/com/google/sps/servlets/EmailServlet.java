// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles comment data*/
@WebServlet("/email")
public class EmailServlet extends HttpServlet {
//     private ArrayList<String> messages;
    private DatastoreService datastore;

    @Override
    public void init(){
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

//     @Override
//     public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//         Query query = new Query("comment").addSort("timestamp", SortDirection.DESCENDING);
//         messages = new ArrayList<String>();
//         PreparedQuery results = datastore.prepare(query);
//         for (Entity comment: results.asIterable()){
//             String temp = (String) comment.getProperty("comment");
//             messages.add(temp);
//         }
//         response.setContentType("application/json");
//         Gson gson = new Gson();
//         String json = gson.toJson(messages);
//         response.getWriter().println(json);
//   }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        String address = request.getParameter("address");
        String message = request.getParameter("message");

        Entity emailEntity = new Entity("email");
        long timestamp = System.currentTimeMillis();
        emailEntity.setProperty("email", address);
        emailEntity.setProperty("message", message);
        emailEntity.setProperty("timestamp", timestamp);
        datastore.put(emailEntity);

            response.sendRedirect("/index.html");

  }
}


