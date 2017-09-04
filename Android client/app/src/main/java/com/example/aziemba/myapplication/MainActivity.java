package com.example.aziemba.myapplication;

import android.content.Context;
import android.graphics.Color;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
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
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    private String SERVER_ADDRESS=" http://192.168.0.189:8081"; //TODO
    private int activeBoard=-1;
    private int activeTask=-1;
    JSONObject data=null;

    //load loyout methods
    private void Llog_in(){
        setContentView(R.layout.log_in);
        Button button;
        //sign in button
        button = (Button) findViewById(R.id.button_accept_sign_in);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v) {
                if (((EditText) findViewById(R.id.user_login)).getText().toString().trim().length() > 2 && ((EditText) findViewById(R.id.user_password)).getText().toString().trim().length() > 7)
                {       savePreferences();
                if (!SignIn())
                    makeToast("Type correct login and password first! - ");
            }
                else
                    makeToast("Type correct login and password first! - ");
            }
        });
        // reset password button view
        button = (Button) findViewById(R.id.button_reset_password_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lreset_pass();
            }
        });
        // sign up button view
        button = (Button) findViewById(R.id.button_sign_up_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lsign_up();
            }
        });
    }
    private void Lboard(){
        setContentView(R.layout.board);
        relodeBoard();
        Button button;
        // settings button
        button = (Button) findViewById(R.id.button_settings_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lsett();
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
                Llog_in();
            }
        });
        //active members view
        button = (Button) findViewById(R.id.button_active_members_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lmembers();
            }
        });
        //add new task button
        button = (Button) findViewById(R.id.button_newTASKT);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Enter new task name");
                button2= (Button) findViewById(R.id.input_ok_button);
                button2.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        lastInput=checkInput();
                        if (lastInput!="")
                        {
                            nameTTTT=lastInput;
                            setContentView(R.layout.input);
                            Button button3;
                            ((TextView)findViewById(R.id.input_static_text2)).setText("Write first comment");
                            button3= (Button) findViewById(R.id.input_ok_button);
                            button3.setOnClickListener(new View.OnClickListener()
                            {
                                public void onClick(View v)
                                {
                                    String infoT=checkInput();
                                    try {
                                        JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                                        String owner = BOARD.getString("owner");
                                        String board = BOARD.getString("board");
                                        try {
                                            if (sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                                    ",\"owner\":\"" + owner + "\",\"task\":\"" + nameTTTT + "\",\"info\":\"" + infoT + "\"}"))

                                                Ltask();
                                        } catch (Exception e) {
                                            e.printStackTrace();
                                        }
                                    }
                                    catch (JSONException e)
                                    {
                                        e.printStackTrace();
                                    }
                                }
                            });
                        }
                        else
                            Lboard();
                    }
                });
            }
        });
        //new button_active_boards_view
        button = (Button) findViewById(R.id.button_active_boards_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lboards();
            }
        });
        // button leafe/delete board
        button = (Button) findViewById(R.id.LEAVE_BOARD);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.in_leaveboard);
                ((TextView)findViewById(R.id.input_static_text)).setText("Do you want to leave board?");
                Button button2 = (Button) findViewById(R.id.input_no);
                button2.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        Lboards();
                    }
                });
                button2 = (Button) findViewById(R.id.input_yes);
                button2.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
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
                            Lboards();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
    }
    private  String nameTTTT;
    private void Lboards(){
        setContentView(R.layout.boards);
        relodeBoards();
        Button button;
        // settings button
        button = (Button) findViewById(R.id.button_settings_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lsett();
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
                Llog_in();
            }
        });
        // button_newboard button
        button = (Button) findViewById(R.id.button_newboard);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Write new board name");
                button2= (Button) findViewById(R.id.input_ok_button);
                button2.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        lastInput=checkInput();
                        if (lastInput!="")
                        {
                            try {
                                if (sendRequest("CreateNewBoard","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\",\"board\":\""+lastInput+"\"}"))
                                    Lboards();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        else
                            Lboards();
                    }
                });
            }
        });
    }
    private void Lmembers(){
        setContentView(R.layout.members);
        reloadMembers();
        Button button;
        // settings button
        button = (Button) findViewById(R.id.button_settings_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lsett();
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
                Llog_in();
            }
        });
        //active members view
        button = (Button) findViewById(R.id.button_active_board_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lboard();
            }
        });
        //new member button
        button = (Button) findViewById(R.id.button_newmember);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Who you want to invite?");
                button2= (Button) findViewById(R.id.input_ok_button);
                button2.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        lastInput=checkInput();
                        if (lastInput!="")
                        {
                            String member = lastInput;
                            try {
                                JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                                String owner = BOARD.getString("owner");
                                String board = BOARD.getString("board");
                                try {
                                    if (sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                            ",\"owner\":\"" + owner + "\",\"member\":\"" + member + "\"}"))

                                        Lmembers();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                            catch (JSONException e)
                            {   e.printStackTrace();
                            }
                        }
                        else
                            Lmembers();
                    }
                });
            }
        });
    }
    private void Lreset_pass(){
        setContentView(R.layout.reset_password);
        Button button;
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
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    makeToast("If they're right, you recived mail");
                }
                else
                    makeToast("Fill the fields!");
            }
        });
        // sign in button view
        button = (Button) findViewById(R.id.button_sign_in_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Llog_in();
            }
        });
    }
    private void Lsett(){
        setContentView(R.layout.settings);
        Button button;
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
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                else
                    makeToast("letters and numbers only, password 8 to 20 length, passwords must be equal");
                Lboards();
            }
        });
        //new button_active_boards_view
        button = (Button) findViewById(R.id.button_active_boards_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lboards();
            }
        });
    }
    private void Lsign_up(){
        setContentView(R.layout.sign_up);
        Button button;
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
        // sign in button view
        button = (Button) findViewById(R.id.button_sign_in_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Llog_in();
            }
        });
    }
    private void Ltask(){
        setContentView(R.layout.task);
        relodeTask();
        Button button;
        // settings button
        button = (Button) findViewById(R.id.button_settings_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lsett();
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
                Llog_in();
            }
        });
        //active members view
        button = (Button) findViewById(R.id.button_active_board_view);
        button.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Lboard();
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
                setContentView(R.layout.in_leaveboard);
                ((TextView)findViewById(R.id.input_static_text)).setText("Do you want to delete this task?");
                Button button2 = (Button) findViewById(R.id.input_no);
                button2.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        Ltask();
                    }
                });
                button2 = (Button) findViewById(R.id.input_yes);
                button2.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        try {
                            JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                            String owner = BOARD.getString("owner");
                            String board = BOARD.getString("board");
                            String nameT = BOARD.getJSONArray("tasks").getString(activeTask);
                            sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                    ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\"}");
                            Lboard();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
    }

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
            ((TextView) findViewById(R.id.members_owner)).setText("Owner: "+board.getString("owner"));
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
                        Ltask();
                    }
                });
                ll.addView(myButton, bp);
            }
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
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
                        Lboard();
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
                            setContentView(R.layout.in_leaveboard);
                            ((TextView)findViewById(R.id.input_static_text)).setText("Do you want to delete Task?");
                            Button button2 = (Button) findViewById(R.id.input_no);
                            button2.setOnClickListener(new View.OnClickListener() {
                                public void onClick(View v) {
                                    try {
                                        JSONObject invitation = data.getJSONArray("invitations").getJSONObject(Integer.parseInt(v.getTag().toString()));
                                        String board=invitation.getString("board");
                                        String owner=invitation.getString("owner");
                                        if (sendRequest("ReffuseInviattion","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\",\"board\":\""+board+"\",\"owner\":\""+owner+"\"}"))
                                            Lboards();
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            });
                            button2 = (Button) findViewById(R.id.input_yes);
                            button2.setOnClickListener(new View.OnClickListener()
                            {
                                public void onClick(View v)
                                {
                                    try {
                                        JSONObject invitation = data.getJSONArray("invitations").getJSONObject(Integer.parseInt(v.getTag().toString()));
                                        String board=invitation.getString("board");
                                        String owner=invitation.getString("owner");
                                        if (sendRequest("AcceptInviattion","{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\",\"board\":\""+board+"\",\"owner\":\""+owner+"\"}"))
                                            Lboards();
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            });
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
    }

    //user/account methods
    private boolean SignUp(){
        try {
            return sendRequest("registration",
                    "{\"login\":\""+((EditText)findViewById(R.id.user_login)).getText().toString().trim()+"\"," +
                            "\"password\":\""+((EditText)findViewById(R.id.user_password)).getText().toString().trim()+"\"," +
                            "\"password2\":\""+((EditText)findViewById(R.id.user_password2)).getText().toString().trim()+"\"," +
                            "\"email\":\""+((EditText)findViewById(R.id.user_email)).getText().toString().trim()+"\"}");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    private boolean SignIn(){
            loadPreferences();
        makeToast("x"+edt_password+"xx"+edt_username+"x");
            if (sendRequest("authorization","{\"login\":\""+edt_username.trim()+"\",\"password\":\""+edt_password.trim()+"\"}")) {
                Lboards();
                return true;
            }
            return false;
    }
    private void LogOut(){
        clearPreferences();
    }

    //send json np "{\"phonetype\":\"N95\",\"cat\":\"WP\"}"
    private boolean sendRequestMain(String urlAddress, String json) throws IOException {
        boolean _return=false;
        URL url;
        HttpURLConnection connection = null;
        try {
            url = new URL(SERVER_ADDRESS+"/"+urlAddress);
            connection = (HttpURLConnection)url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.connect();

            //Send request
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes((new JSONObject(json)).toString());
            wr.flush();
            wr.close ();

            //InputStream is; //return is = connection.getErrorStream();
            if (connection.getResponseCode()==200) {
                System.out.println("coonection ok");
                _return= true;
            } else {
                String text = (connection).getResponseMessage();
                System.out.println(text);
                makeToast(text);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(connection != null) {
                connection.disconnect();
            }
        }
        if (_return) {
            if (sendGetAll())
                return true;
            else {
                LogOut();
                makeToast("Something's gone wrong. Try again.");
                Llog_in();
            }
        }
        return false;
    }
    private boolean flagasend=false;
    private boolean result=false;
    private boolean sendRequest(String urlAddress, String json){
        urlAddress2=urlAddress;
        jsonMySon=json;
        flagasend=true;
        result=false;
        new Asynch().execute("");
        while (flagasend)
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        return result;
    }
    private String urlAddress2;
    private String jsonMySon;
    private class Asynch extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            result=false;
            try {
                result=sendRequestMain(urlAddress2,jsonMySon);
            } catch (IOException e) {
                e.printStackTrace();
            }
            flagasend=false;
            return "";
        }
        @Override
        protected void onPostExecute(String result) {        }
        @Override
        protected void onPreExecute() {}
        @Override
        protected void onProgressUpdate(Void... values) {}
    }

    private boolean sendGetAll(){
        boolean _return=false;
        URL url;
        HttpURLConnection connection = null;
        try {
            url = new URL(SERVER_ADDRESS+"/getBoardsAndInvitations");
            connection = (HttpURLConnection)url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setReadTimeout(10000 /* milliseconds */ );
            connection.setConnectTimeout(15000 /* milliseconds */ );
            connection.connect();

            //Send request
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes((new JSONObject(("{\"login\":\""+edt_username+"\",\"password\":\""+edt_password+"\"}"))).toString());
            wr.flush();
            wr.close ();

            //InputStream is; //return is = connection.getErrorStream();
            String response = connection.getResponseMessage();
            if (connection.getResponseCode()==200) {
                System.out.println("coonection ok");

                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder sb = new StringBuilder();

                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();

                data=new JSONObject( sb.toString().trim());
                _return= true;
            } else {
                System.out.println(response);
                makeToast(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(connection != null) {
                connection.disconnect();
            }
        }
        return _return;
    }

    String TYPEG="";
    // other helpers
    private void addStatus(String type){
        TYPEG=type;
        setContentView(R.layout.input);
        Button button2;
        ((TextView)findViewById(R.id.input_static_text2)).setText("Write command");
        button2= (Button) findViewById(R.id.input_ok_button);
        button2.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                lastInput=checkInput();
                if (lastInput!="")
                {
                    String info = lastInput;
                    try {
                        JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                        String owner = BOARD.getString("owner");
                        String board = BOARD.getString("board");
                        String nameT = BOARD.getJSONArray("tasks").getString(activeTask);
                        sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + info + "\",\"type\":\""+TYPEG+"\"}");
                        Lboard();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                else
                    Lboard();
            }
        });
    }

    private void makeToast(String text){
        Context context = getApplicationContext();
        int duration = Toast.LENGTH_SHORT;
        Toast toast = Toast.makeText(context, text, duration);
        toast.show();
    }

    //get custom input
    private View currentView=null;
    private String lastInput="";
    private String checkInput(){
        String input =((EditText)findViewById(R.id.input_text33)).getText().toString().trim();
        if (input.length()>0)
            return input;
        return "";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadPreferences();
        if (edt_username!="" && edt_password!="" && SignIn()){
            Lboards();
        }
        else{
            Llog_in();
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
    // preferences method
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

        editor.putString(PREF_UNAME, ((EditText)findViewById(R.id.user_login)).getText().toString().trim());
        editor.putString(PREF_PASSWORD, ((EditText)findViewById(R.id.user_password)).getText().toString().trim());
        editor.commit();
    }
    private  void clearPreferences() {
        SharedPreferences preferences = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);
        preferences.edit().remove(PREF_UNAME).remove(PREF_PASSWORD).commit();
    }
}
