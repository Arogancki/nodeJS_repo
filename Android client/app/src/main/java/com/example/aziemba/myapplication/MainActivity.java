package com.example.aziemba.myapplication;


import android.content.Context;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.content.SharedPreferences;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
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

    //relode methods
    private void relodeTask(){
        LinearLayout ll = (LinearLayout)findViewById(R.id.l_task);
        if(((LinearLayout) ll).getChildCount() > 0)
            ((LinearLayout) ll).removeAllViews();
        try {
            JSONArray statuses =data.getJSONArray("boards").getJSONObject(activeBoard).getJSONArray("tasks").getJSONObject(activeTask).getJSONArray("statuses");
            for (int i = 0; i < statuses.length(); i++) {
                JSONObject status=statuses.getJSONObject(i);
                LinearLayout LL = new LinearLayout(this);
                LL.setOrientation(LinearLayout.HORIZONTAL);
                LinearLayout.LayoutParams LLParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                LL.setWeightSum(1);
                LLParams.setMargins(0,10,0,0);

                LinearLayout.LayoutParams bp1 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp1.weight=0.25f;
                Button myButton1 = new Button(this);
                myButton1.setText(status.getString("type"));
                myButton1.setBackgroundColor(Color.TRANSPARENT);
                myButton1.setGravity(Gravity.CENTER);
                myButton1.setTextColor(Color.WHITE);
                LL.addView(myButton1, bp1);

                LinearLayout.LayoutParams bp2 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp2.weight=0.25f;
                Button myButton2 = new Button(this);
                myButton2.setText(status.getString("user"));
                myButton2.setBackgroundColor(Color.TRANSPARENT);
                myButton2.setGravity(Gravity.CENTER);
                myButton2.setTextColor(Color.WHITE);
                LL.addView(myButton2, bp2);

                LinearLayout.LayoutParams bp3 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp3.weight=0.25f;
                Button myButton3 = new Button(this);
                myButton3.setText(status.getString("info"));
                myButton3.setBackgroundColor(Color.TRANSPARENT);
                myButton3.setGravity(Gravity.CENTER);
                myButton3.setTextColor(Color.WHITE);
                LL.addView(myButton3, bp3);

                LinearLayout.LayoutParams bp4 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp4.weight=0.25f;
                Button myButton4 = new Button(this);
                myButton4.setText(status.getString("date"));
                myButton4.setBackgroundColor(Color.TRANSPARENT);
                myButton4.setGravity(Gravity.CENTER);
                myButton4.setTextColor(Color.WHITE);
                LL.addView(myButton4, bp4);

                ll.addView(LL, LLParams);
            }
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        setContentView(R.layout.task);
    };
    private void reloadMembers(){
        LinearLayout ll = (LinearLayout)findViewById(R.id.l_invited);
        if(((LinearLayout) ll).getChildCount() > 0)
            ((LinearLayout) ll).removeAllViews();
        LinearLayout l2 = (LinearLayout)findViewById(R.id.l_members);
        if(((LinearLayout) l2).getChildCount() > 0)
            ((LinearLayout) l2).removeAllViews();
        try {
            JSONObject board = data.getJSONArray("boards").getJSONObject(activeBoard);
            JSONArray members = board.getJSONArray("members");
            for (int i = 0; i < members.length(); i++) {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                String member = members.getString(i);
                final Button myButton = new Button(this);
                myButton.setText(member);
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(Gravity.CENTER);
                myButton.setTextColor(Color.WHITE);
                l2.addView(myButton, bp);
            }
            JSONArray invitations = board.getJSONArray("invitations");
            for (int i = 0; i < invitations.length(); i++) {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                String invitation = invitations.getString(i);
                final Button myButton = new Button(this);
                myButton.setText(invitation);
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(Gravity.CENTER);
                myButton.setTextColor(Color.WHITE);
                ll.addView(myButton, bp);
            }
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        setContentView(R.layout.members);
    }
    private void relodeBoard(){
        LinearLayout ll = (LinearLayout)findViewById(R.id.l_tasks);
        if(((LinearLayout) ll).getChildCount() > 0)
            ((LinearLayout) ll).removeAllViews();
        activeTask=-1;
        try {
            JSONObject board = data.getJSONArray("boards").getJSONObject(activeBoard);
            JSONArray tasks = board.getJSONArray("tasks");
            for (int i = 0; i < tasks.length(); i++) {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                JSONObject task = tasks.getJSONObject(i);
                final Button myButton = new Button(this);
                myButton.setText(task.getString("name"));
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(Gravity.CENTER);
                myButton.setTextColor(Color.WHITE);
                myButton.setTag(i);
                // button onclik
                myButton.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        activeTask = Integer.parseInt(v.getTag().toString());
                        relodeTask();
                    }
                });
                ll.addView(myButton, bp);
            }
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        setContentView(R.layout.board);
    }
    private void relodeBoards(){
        LinearLayout ll = (LinearLayout)findViewById(R.id.l_boards);
        if(((LinearLayout) ll).getChildCount() > 0)
            ((LinearLayout) ll).removeAllViews();
        LinearLayout l2 = (LinearLayout)findViewById(R.id.l_invitations);
        if(((LinearLayout) l2).getChildCount() > 0)
            ((LinearLayout) l2).removeAllViews();
        activeTask=-1;
        activeBoard=-1;
        try {
            JSONArray boards = data.getJSONArray("boards");
            for (int i = 0; i < boards.length(); i++) {
                JSONObject board = boards.getJSONObject(i);
                final Button myButton = new Button(this);
                myButton.setText(board.getString("name")+" ("+board.get("owner")+")");
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(Gravity.CENTER);
                myButton.setTextColor(Color.WHITE);
                myButton.setTag(i);
                // button onclik
                myButton.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        activeBoard= Integer.parseInt(v.getTag().toString());
                        relodeBoard();
                    }
                });
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                ll.addView(myButton, bp);
            }

            JSONArray invitations = data.getJSONArray("invitations");
            for (int i = 0; i < invitations.length(); i++) {
                JSONObject invitation = invitations.getJSONObject(i);
                Button myButton = new Button(this);
                myButton.setText(invitation.getString("name")+" ("+invitation.get("owner")+")");
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(Gravity.CENTER);
                myButton.setTextColor(Color.WHITE);
                myButton.setTag(i);
                myButton.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        try {
                            JSONObject invitation = data.getJSONArray("invitations").getJSONObject(Integer.parseInt(v.getTag().toString()));
                            String board=invitation.getString("board");
                            String owner=invitation.getString("owner");
                        getInput("Type yes or no");
                        if (lastInput.toLowerCase()!="yes")
                        {
                            try {
                                if (sendRequest("AcceptInviattion","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\",\"board\":\""+board+"\",\"owner\":\""+owner+"\"}"))
                                    relodeBoards();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        if (lastInput.toLowerCase()!="no")
                        {
                            try {
                                if (sendRequest("ReffuseInviattion","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\",\"board\":\""+board+"\",\"owner\":\""+owner+"\"}"))
                                    relodeBoards();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
                LinearLayout.LayoutParams pp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                l2.addView(myButton, pp);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
        setContentView(R.layout.boards);
    }

    private String SERVER_ADDRESS=""; //TODO

    private int activeBoard=-1;
    private int activeTask=-1;

    private boolean SignUp(){
        try {
            return sendRequest("registration",
                    "{\"login\":\""+((EditText)findViewById(R.id.user_login)).getText().toString()+"\"," +
                            "\"password\":\""+((EditText)findViewById(R.id.user_password)).getText().toString()+"\"," +
                            "\"password2\":\""+((EditText)findViewById(R.id.user_password2)).getText().toString()+"\"," +
                            "\"email\":\""+((EditText)findViewById(R.id.user_email)).getText().toString()+"\"}");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    private void SignIn(){
        try {
            savePreferences();
            loadPreferences();
            if (sendRequest("authorization","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\"}")) {
                relodeBoards();
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
        Button button;
        //sign in button
        button = (Button) findViewById(R.id.button_accept_sign_in);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                if (((EditText)findViewById(R.id.user_login)).getText().toString().length()>2 && ((EditText)findViewById(R.id.user_password)).getText().toString().length()>7)
                    SignIn();
                else
                    makeToast("Type logn and password first!");
            }
        });
        // reset password button view
        button = (Button) findViewById(R.id.button_reset_password_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.reset_password);
            }
        });
        // sign up button view
        button = (Button) findViewById(R.id.button_sign_up_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.sign_up);
            }
        });
        // sign in button view
        button = (Button) findViewById(R.id.button_sign_in_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.log_in);
            }
        });
        // sign up button
        button = (Button) findViewById(R.id.button_accept_sign_up);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                if (((EditText)findViewById(R.id.user_login)).getText().toString().length()>2 &&
                        ((EditText)findViewById(R.id.user_password)).getText().toString().length()>7 &&
                        ((EditText)findViewById(R.id.user_password2)).getText().toString()==((EditText)findViewById(R.id.user_password)).getText().toString()) {
                    if (SignUp())
                        SignIn();
                }
                    else
                        makeToast("letters and numbers only, login 3, password 8 to 20 length, passwords must be equal");
            }
        });
        // reset password button
        button = (Button) findViewById(R.id.button_accept_reset_password);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                String log_=((EditText)findViewById(R.id.user_login)).getText().toString();
                String ema_=((EditText)findViewById(R.id.user_email)).getText().toString();
                if (log_.length()>0 && ema_.length()>0){
                    try {
                        sendRequest("resetpassword","{\"login\":\""+log_+"\",\"email\":\""+ema_+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    makeToast("If they're right, you recived mail");
                }
                else
                    makeToast("Fill the fields!");
            }
        });
        // settings button
        button = (Button) findViewById(R.id.button_settings_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.settings);
            }
        });
        //sign out button
        button = (Button) findViewById(R.id.button_sign_out_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                clearPreferences();
                data =null;
                setContentView(R.layout.log_in);
            }
        });
        // button_newboard button
        button = (Button) findViewById(R.id.button_newboard);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                getInput("Enter new board name");
                if (lastInput!="")
                {
                    try {
                        if (sendRequest("CreateNewBoard","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\",\"board\":\""+lastInput+"\"}"))
                            relodeBoards();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        //add new task button
        button = (Button) findViewById(R.id.button_newTASKT);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                getInput("Enter new task name");
                if (lastInput!=""){
                    String nameT=lastInput;
                    getInput("Write first comment");
                    if (lastInput!=""){
                        String infoT=lastInput;
                        try {
                            JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                            String owner = BOARD.getString("owner");
                            String board = BOARD.getString("board");
                            try {
                                if (sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                        ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + infoT + "\"}"))

                                relodeTask();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        catch (JSONException e)
                        {   e.printStackTrace();
                        }
                    }
                }
            }
        });
        //active members view
        button = (Button) findViewById(R.id.button_active_members_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                reloadMembers();
            }
        });
        //active members view
        button = (Button) findViewById(R.id.button_active_board_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                relodeBoard();
            }
        });
        //new member button
        button = (Button) findViewById(R.id.button_newmember);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                getInput("Who you want to invite?");
                if (lastInput!=""){
                    String member = lastInput;
                    try {
                        JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                        String owner = BOARD.getString("owner");
                        String board = BOARD.getString("board");
                        try {
                            if (sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                    ",\"owner\":\"" + owner + "\",\"member\":\"" + member + "\"}"))

                            reloadMembers();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    catch (JSONException e)
                    {   e.printStackTrace();
                    }
                }
            }
        });
        //new button_accept_change
        button = (Button) findViewById(R.id.button_accept_change);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                if ((((EditText)findViewById(R.id.user_password)).getText().toString().length()>7 &&
                        ((EditText)findViewById(R.id.user_password2)).getText().toString()==((EditText)findViewById(R.id.user_password)).getText().toString()) ||
                        ((EditText)findViewById(R.id.user_password)).getText().toString().length()==0 && ((EditText)findViewById(R.id.user_password2)).getText().toString().length()==0 &&
                                ((EditText)findViewById(R.id.user_email)).getText().toString().length()!=0)
                {
                    try {
                        sendRequest("changeUserData",
                                "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\"," +
                                        "\"newPassword\":\""+((EditText)findViewById(R.id.user_password)).getText().toString()+"\"," +
                                        "\"newPassword2\":\""+((EditText)findViewById(R.id.user_password2)).getText().toString()+"\"," +
                                        "\"newEmail\":\""+((EditText)findViewById(R.id.user_email)).getText().toString()+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                else
                    makeToast("letters and numbers only, password 8 to 20 length, passwords must be equal");
                relodeBoards();
            }
        });
        //new button_active_boards_view
        button = (Button) findViewById(R.id.button_active_boards_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
               relodeBoards();
            }
        });
        // button_button_inprogres
        button = (Button) findViewById(R.id.button_inprogres);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("In progress");
            }
        });
        // button_button_blocked
        button = (Button) findViewById(R.id.button_blocked);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("Blocked");
            }
        });
        // button_button_finished
        button = (Button) findViewById(R.id.button_finished);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("Finished");
            }
        });
        // button_button_resumed
        button = (Button) findViewById(R.id.button_resumed);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("Resumed");
            }
        });
        // button_button_delete
        button = (Button) findViewById(R.id.button_delete);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                getInput("Type yes if you want to delate task");
                if (lastInput.toLowerCase()!="yes"){
                    try {
                        JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                        String owner = BOARD.getString("owner");
                        String board = BOARD.getString("board");
                        String nameT = BOARD.getJSONArray("tasks").getString(activeTask);
                        sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\"}");
                        relodeBoard();
                    } catch (JSONException | IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        // button leafe/delete board
        button = (Button) findViewById(R.id.LEAVE_BOARD);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                getInput("Type yes if you want to delate board");
                if (lastInput.toLowerCase()!="yes"){
                    try {
                        JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                        String owner = BOARD.getString("owner");
                        String board = BOARD.getString("board");
                        if (owner.toLowerCase()==edt_username.toLowerCase())
                            sendRequest("DeleteBoard", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                    ",\"owner\":\"" + owner + "\"}");
                        else
                            sendRequest("LeaveBoard", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                    ",\"owner\":\"" + owner + "\"}");
                        relodeBoards();
                    } catch (JSONException | IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    private void addStatus(String type){
        getInput("Write command");
        if (lastInput!=""){
            String info = lastInput;
            try {
            JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
            String owner = BOARD.getString("owner");
            String board = BOARD.getString("board");
            String nameT = BOARD.getJSONArray("tasks").getString(activeTask);
            sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                    ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + info + "\",\"type\":\""+type+"\"}");
            relodeBoard();
            } catch (JSONException | IOException e) {
                e.printStackTrace();
            }
        }
    }

    private View currentView=null;
    private String lastInput="";
    private void getInput(String text){
        ((EditText)findViewById(R.id.input_text)).setTag("");
        ((TextView)findViewById(R.id.input_static_text)).setText(text);
        currentView = this.getWindow().getDecorView().findViewById(android.R.id.content);
        setContentView(R.layout.input);
        ((Button) findViewById(R.id.input_ok_button)).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                String input =((EditText)findViewById(R.id.input_text)).getText().toString();
                if (input.length()>0)
                    lastInput=input;
                else
                    lastInput="";
                setContentView(currentView);
            }
        });
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
            url = new URL(SERVER_ADDRESS+"/getBoardsAndInvitations");
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
                url = new URL(SERVER_ADDRESS+"/"+urlAddress);
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
        UnameValue = ((EditText)findViewById(R.id.user_login)).getText().toString();
        PasswordValue = ((EditText)findViewById(R.id.user_password)).getText().toString();;
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
