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

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.gson.Gson;
import java.util.ArrayList;


/** Servlet that translates data*/
@WebServlet("/translate")
public class TranslationServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the request parameters.
    String[] originalText = request.getParameter("text").split("%");
    String languageCode = request.getParameter("languageCode");
    ArrayList<String> translatedText = new ArrayList<String>();
   

    // Do the translation.
    Translate translate = TranslateOptions.getDefaultInstance().getService();
    for (int i = 0; i < originalText.length; i++){
        Translation translation = translate.translate(originalText[i], Translate.TranslateOption.targetLanguage(languageCode));
        translatedText.add(translation.getTranslatedText());
    }
    // Output the translation.
    response.setContentType("application/json");
        Gson gson = new Gson();
        String json = gson.toJson(translatedText);
        response.getWriter().println(json);
  }
}
