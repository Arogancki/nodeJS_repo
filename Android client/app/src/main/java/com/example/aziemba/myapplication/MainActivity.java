package com.example.aziemba.myapplication;


import android.content.Context;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.content.SharedPreferences;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class MainActivity extends AppCompatActivity {

    private JSONObject activeBoard=null;
    private JSONObject activeTask=null;

    private void SignIn(){
        try {
            if (sendRequest("adresurl","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\"}")) {
                activeTask=null;
                activeBoard=null;
                try {
                    JSONArray boards = data.getJSONArray("boards");
                    for (int i = 0; i < boards.length(); i++) {
                        JSONObject board = boards.getJSONObject(i);
                        Button myButton = new Button(this);
                        myButton.setText(board.getString("name")+" ("+board.get("owner")+")");
                        myButton.setBackgroundColor(Color.TRANSPARENT);
                        myButton.setGravity(Gravity.CENTER);
                        myButton.setTextColor(Color.WHITE);
                        myButton.setTag("boa$"+board.getString("name")+"$"+board.getString("owner"));

                        LinearLayout ll = (LinearLayout)findViewById(R.id.l_boards);
                        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                        ll.addView(myButton, lp);
                    }

                    JSONArray invitations = data.getJSONArray("invitations");
                    for (int i = 0; i < invitations.length(); i++) {
                        JSONObject invitation = invitations.getJSONObject(i);
                        Button myButton = new Button(this);
                        myButton.setText(invitation.getString("name")+" ("+invitation.get("owner")+")");
                        myButton.setBackgroundColor(Color.TRANSPARENT);
                        myButton.setGravity(Gravity.CENTER);
                        myButton.setTextColor(Color.WHITE);
                        myButton.setTag("inv$"+invitation.getString("name")+"$"+invitation.getString("owner"));

                        LinearLayout ll = (LinearLayout)findViewById(R.id.l_invitations);
                        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                        ll.addView(myButton, lp);
                    }
                    setContentView(R.layout.boards);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadPreferences();
        if (edt_username!=null && edt_password!=null){
            SignIn();
        }
        else{
            setContentView(R.layout.log_in);
        }
    }
    @Override
    public void onPause() {
        super.onPause();
        savePreferences();
    }
    @Override
    public void onResume() {
        super.onResume();
        loadPreferences();
    }

    private boolean sendGetAll(){
        URL url;
        URLConnection urlConn;
        DataOutputStream printout;
        DataInputStream input;
        try {
            url = new URL(""+"/getBoardsAndInvitations");
            urlConn = url.openConnection();
        } catch (IOException e) {
            System.out.print("Zly url");
            return false;
        }
        urlConn.setDoInput(true);
        urlConn.setDoOutput(true);
        urlConn.setUseCaches(false);
        urlConn.setRequestProperty("Content-Type", "application/json");
        urlConn.setRequestProperty("Host", "android.schoolportal.gr");
        try {
            urlConn.connect();
        } catch (IOException e) {
            System.out.print("Brak polaczenia");
            return false;
        }
        //Create JSONObject here
        try {
            JSONObject jsonObj = new JSONObject("{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\"}");
            OutputStreamWriter out = new OutputStreamWriter(urlConn.getOutputStream());
            out.write(jsonObj.toString());
            out.close();
        } catch (JSONException e) {
            System.out.print("zly json");
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        try {
            int HttpResult = ((HttpURLConnection) urlConn).getResponseCode();
            String text = ((HttpURLConnection) urlConn).getResponseMessage();
            if (HttpResult == HttpURLConnection.HTTP_OK) {
             System.out.println("getAll ok");
                data = new JSONObject(text);
                //TODO rozlozyc odebrane jsony - board, invitations, activeBoard, activetask - nie bedziemy je rozkladac w kazdym unicie osobno! :D

                return true;
            } else {
             System.out.println(text);
             makeToast(text);
             return false;
            }
        }
        catch (IOException e) {
            e.printStackTrace();
            return false;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }

    JSONObject data=null;

    //json np "{\"phonetype\":\"N95\",\"cat\":\"WP\"}"
    private boolean sendRequest(String urlAddress, String json) throws IOException {
            URL url;
            URLConnection urlConn;
            DataOutputStream printout;
            DataInputStream input;
            try {
                url = new URL(urlAddress);
                urlConn = url.openConnection();
            } catch (IOException e) {
                System.out.print("Zly url");
                return false;
            }
            urlConn.setDoInput(true);
            urlConn.setDoOutput(true);
            urlConn.setUseCaches(false);
            urlConn.setRequestProperty("Content-Type", "application/json");
            urlConn.setRequestProperty("Host", "android.schoolportal.gr");
            try {
                urlConn.connect();
            } catch (IOException e) {
                System.out.print("Brak polaczenia");
                return false;
            }
            //Create JSONObject here
            try {
                JSONObject jsonObj = new JSONObject(json);
                OutputStreamWriter out = new OutputStreamWriter(urlConn.getOutputStream());
                out.write(jsonObj.toString());
                out.close();
            } catch (JSONException e) {
                System.out.print("zly json");
                return false;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }

            int HttpResult = ((HttpURLConnection) urlConn).getResponseCode();
            if (HttpResult == HttpURLConnection.HTTP_OK) {
                System.out.println("ok");
                if (sendGetAll())
                    return true;
                else{
                    LogOut();
                    makeToast("Something's gone wrong. Try to sign again.");
                    setContentView(R.layout.log_in);
                    return false;
                }
            } else {
                String text = ((HttpURLConnection) urlConn).getResponseMessage();
                System.out.println(text);
                makeToast(text);
                return false;
            }
    }

    //TODO logout function - forget everything
    private void LogOut(){
        clearPreferences();
    }

    private void makeToast(String text){
        Context context = getApplicationContext();
        int duration = Toast.LENGTH_SHORT;
        Toast toast = Toast.makeText(context, text, duration);
        toast.show();
    }

    private static final String PREFS_NAME = "preferences";
    private static final String PREF_UNAME = "Username";
    private static final String PREF_PASSWORD = "Password";

    private final String DefaultUnameValue = "";
    private String UnameValue;

    private final String DefaultPasswordValue = "";
    private String PasswordValue;
    String edt_username=null;
    String edt_password=null;

    private void loadPreferences() {

        SharedPreferences settings = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);

        // Get value
        UnameValue = settings.getString(PREF_UNAME, DefaultUnameValue);
        PasswordValue = settings.getString(PREF_PASSWORD, DefaultPasswordValue);
        edt_username=UnameValue;
        edt_password=PasswordValue;
        System.out.println("onResume load name: " + UnameValue);
        System.out.println("onResume load password: " + PasswordValue);
    }
    private void savePreferences() {
        SharedPreferences settings = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = settings.edit();

        // Edit and commit
        UnameValue = edt_username;
        PasswordValue = edt_password;
        System.out.println("onPause save name: " + UnameValue);
        System.out.println("onPause save password: " + PasswordValue);
        editor.putString(PREF_UNAME, UnameValue);
        editor.putString(PREF_PASSWORD, PasswordValue);
        editor.commit();
    }

    private  void clearPreferences() {
        SharedPreferences preferences = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);
        preferences.edit().remove(PREF_UNAME).remove(PREF_PASSWORD).commit();
    }
}
