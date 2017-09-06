package com.example.aziemba.myapplication;

import android.content.Context;
import android.graphics.Color;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.KeyEvent;
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

import static android.R.color.transparent;
import static android.view.Gravity.CENTER;
import static android.widget.GridLayout.HORIZONTAL;

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
                {
                    savePreferences();
                    if (!SignIn())
                        makeToast("Type correct login and password first! - ");
                    else
                        Lboards();
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
                                        String board = BOARD.getString("name");
                                        try {
                                            if (sendRequest("CreateNewTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                                    ",\"owner\":\"" + owner + "\",\"task\":\"" + nameTTTT + "\",\"info\":\"" + infoT + "\"}"))

                                                Lboard();
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
                            String board = BOARD.getString("name");
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
                                String board = BOARD.getString("name");
                                try {
                                    if (sendRequest("InviteToBoard", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                            ",\"owner\":\"" + owner + "\",\"member\":\"" + member + "\"}"))

                                        Lmembers();
                                    else Lmembers();
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
                        ((EditText)findViewById(R.id.user_password2)).getText().toString().equals(((EditText)findViewById(R.id.user_password)).getText().toString())) ||
                        ((EditText)findViewById(R.id.user_password)).getText().toString().length()==0 && ((EditText)findViewById(R.id.user_password2)).getText().toString().length()==0 &&
                                ((EditText)findViewById(R.id.user_email)).getText().toString().length()!=0 || (((EditText)findViewById(R.id.user_password)).getText().toString().length()>7 &&
                        ((EditText)findViewById(R.id.user_password2)).getText().toString().equals(((EditText)findViewById(R.id.user_password)).getText().toString())) && ((EditText)findViewById(R.id.user_email)).getText().toString().length()!=0)
                {
                    try {
                        String passso=edt_password;
                        edt_password=((EditText)findViewById(R.id.user_password)).getText().toString();
                        savePreferences();
                        boolean xxxxxx=sendRequest("changeUserData",
                                "{\"login\":\"" + edt_username + "\",\"password\":\"" + passso + "\"," +
                                        "\"newPassword\":\""+((EditText)findViewById(R.id.user_password)).getText().toString()+"\"," +
                                        "\"newPassword2\":\""+((EditText)findViewById(R.id.user_password2)).getText().toString()+"\"," +
                                        "\"newEmail\":\""+((EditText)findViewById(R.id.user_email)).getText().toString()+"\"}");
                        if (!xxxxxx) {
                            edt_password = passso;
                            savePreferences();
                        }
                        else
                            makeToast("saved!");
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
                if (((EditText)findViewById(R.id.user_login)).getText().toString().trim().length()>2 &&
                        ((EditText)findViewById(R.id.user_password)).getText().toString().trim().length()>7 &&
                        ((EditText)findViewById(R.id.user_password2)).getText().toString().trim().equals(((EditText)findViewById(R.id.user_password)).getText().toString().trim())) {

                    if (SignUp())
                        {
                            makeToast("Created account");
                            Llog_in();
                        }
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
    }

    //relode methods
    private void relodeTask(){
        LinearLayout ll = (LinearLayout)findViewById(R.id.l_task);
        if(((LinearLayout) ll).getChildCount() > 0)
            ((LinearLayout) ll).removeAllViews();

        LinearLayout linearLayout_153 = new LinearLayout(this);
        linearLayout_153.setGravity(CENTER);
        LinearLayout.LayoutParams layout_597 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT,1.0f);
        layout_597.bottomMargin = 20;

        linearLayout_153.setLayoutParams(layout_597);

        Button button_inprogres = new Button(this);
        button_inprogres.setGravity(CENTER);
        button_inprogres.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_185 =  new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_185.height = LinearLayout.LayoutParams.MATCH_PARENT;
        layout_185.weight = 0.15f;
        button_inprogres.setLayoutParams(layout_185);
        button_inprogres.setText("+IP");
        button_inprogres.setBackgroundColor(Color.TRANSPARENT);
        linearLayout_153.addView(button_inprogres);
        // button_button_inprogres
        button_inprogres.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("In progress");
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Adding 'in progress' status. Write command");
                button2= (Button) findViewById(R.id.input_ok_button);
                button2.setOnClickListener(new View.OnClickListener()
                {
                    public void onClick(View v)
                    {
                        lastInput=checkInput();
                        String info = lastInput;
                        try {
                            JSONObject BOARD = data.getJSONArray("boards").getJSONObject(activeBoard);
                            String owner = BOARD.getString("owner");
                            String board = BOARD.getString("name");
                            String nameT = BOARD.getJSONArray("tasks").getJSONObject(activeTask).getString("name");
                            sendRequest("AddStatus", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                    ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + info + "\",\"type\":\""+TYPEG+"\"}");

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        Lboard();
                    }
                });
            }
        });

        Button button_blocked = new Button(this);
        button_blocked.setGravity(CENTER);
        button_blocked.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_912  = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_912.height = LinearLayout.LayoutParams.MATCH_PARENT;
        layout_912.weight = 0.15f;
        button_blocked.setLayoutParams(layout_912);
        button_blocked.setText("+B");
        button_blocked.setBackgroundColor(Color.TRANSPARENT);
        // button_button_blocked
        button_blocked.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("Blocked");
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Adding 'blocked' status. Write command");
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
                                String board = BOARD.getString("name");
                                String nameT = BOARD.getJSONArray("tasks").getJSONObject(activeTask).getString("name");
                                sendRequest("AddStatus", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                        ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + info + "\",\"type\":\""+TYPEG+"\"}");
                                Lboard();
                            } catch (JSONException e) {
                                e.printStackTrace();
                                Lboard();
                            }
                        }
                        else
                            Lboard();
                    }
                });
            }
        });
        linearLayout_153.addView(button_blocked);

        Button button_finished = new Button(this);
        button_finished.setGravity(CENTER);
        button_finished.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_286 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_286.height = LinearLayout.LayoutParams.MATCH_PARENT;
        layout_286.weight = 0.15f;
        button_finished.setLayoutParams(layout_286);
        button_finished.setText("+F");
        button_finished.setBackgroundColor(Color.TRANSPARENT);
        // button_button_finished
        button_finished.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("Finished");
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Adding 'finished' status. Write command");
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
                                String board = BOARD.getString("name");
                                String nameT = BOARD.getJSONArray("tasks").getJSONObject(activeTask).getString("name");
                                sendRequest("AddStatus", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                        ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + info + "\",\"type\":\""+TYPEG+"\"}");
                                Lboard();
                            } catch (JSONException e) {
                                e.printStackTrace();
                                Lboard();
                            }
                        }
                        else
                            Lboard();
                    }
                });
            }
        });
        linearLayout_153.addView(button_finished);

        Button button_resumed = new Button(this);
        button_resumed.setGravity(CENTER);
        button_resumed.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_51 =  new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_51.height = LinearLayout.LayoutParams.MATCH_PARENT;
        layout_51.weight = 0.15f;
        button_resumed.setLayoutParams(layout_51);
        button_resumed.setText("+R");
        button_resumed.setBackgroundColor(Color.TRANSPARENT);
        // button_button_resumed
        button_resumed.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                addStatus("Resumed");
                setContentView(R.layout.input);
                Button button2;
                ((TextView)findViewById(R.id.input_static_text2)).setText("Adding 'Resumed' status. Write command");
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
                                String board = BOARD.getString("name");
                                String nameT = BOARD.getJSONArray("tasks").getJSONObject(activeTask).getString("name");
                                sendRequest("AddStatus", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                        ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\",\"info\":\"" + info + "\",\"type\":\""+TYPEG+"\"}");
                                Lboard();
                            } catch (JSONException e) {
                                e.printStackTrace();
                                Lboard();
                            }
                        }
                        else
                            Lboard();
                    }
                });
            }
        });
        linearLayout_153.addView(button_resumed);

        Button button_delete = new Button(this);
        button_delete.setGravity(CENTER);
        button_delete.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_520 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);

        layout_520.height = LinearLayout.LayoutParams.MATCH_PARENT;
        layout_520.leftMargin = 10;
        button_delete.setText("Delete this task");
        button_delete.setBackgroundColor(Color.TRANSPARENT);
        button_delete.setLayoutParams(layout_520);
        // button_button_delete
        button_delete.setOnClickListener(new View.OnClickListener()
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
                            String board = BOARD.getString("name");
                            String nameT = BOARD.getJSONArray("tasks").getJSONObject(activeTask).getString("name");
                            sendRequest("RemoveTask", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                    ",\"owner\":\"" + owner + "\",\"task\":\"" + nameT + "\"}");
                            Lboard();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
        //linearLayout_153.addView(button_delete);

        ll.addView(linearLayout_153, layout_597);

        LinearLayout linearLayout_868X = new LinearLayout(this);
        linearLayout_868X.setOrientation(HORIZONTAL);
        LinearLayout.LayoutParams layout_263X = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        linearLayout_868X.setLayoutParams(layout_263X);


        linearLayout_868X.addView(button_delete);
        ll.addView(linearLayout_868X, layout_263X);

        LinearLayout linearLayout_868 = new LinearLayout(this);
        linearLayout_868.setOrientation(HORIZONTAL);
        LinearLayout.LayoutParams layout_263 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        linearLayout_868.setLayoutParams(layout_263);

        TextView textView_233 = new TextView(this);
        textView_233.setGravity(CENTER);
        textView_233.setText("status");
        textView_233.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_320 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_320.weight = 0.25f;
        textView_233.setLayoutParams(layout_320);
        linearLayout_868.addView(textView_233);

        TextView textView_553 = new TextView(this);
        textView_553.setGravity(CENTER);
        textView_553.setText("user");
        textView_553.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_345 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_345.weight = 0.25f;
        textView_553.setLayoutParams(layout_345);
        linearLayout_868.addView(textView_553);

        TextView textView_488 = new TextView(this);
        textView_488.setGravity(CENTER);
        textView_488.setText("comment");
        textView_488.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_274 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_274.weight = 0.25f;
        textView_488.setLayoutParams(layout_274);
        linearLayout_868.addView(textView_488);

        TextView textView_841 = new TextView(this);
        textView_841.setGravity(CENTER);
        textView_841.setText("time");
        textView_841.setTextColor(Color.parseColor("#ffffff"));
        LinearLayout.LayoutParams layout_591 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout_591.weight = 0.25f;
        textView_841.setLayoutParams(layout_591);
        linearLayout_868.addView(textView_841);

        ll.addView(linearLayout_868, layout_263);
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
                myButton1.setGravity(CENTER);
                myButton1.setTextColor(Color.WHITE);
                LL.addView(myButton1, bp1);

                LinearLayout.LayoutParams bp2 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp2.weight=0.25f;
                Button myButton2 = new Button(this);
                myButton2.setText(status.getString("user"));
                myButton2.setBackgroundColor(Color.TRANSPARENT);
                myButton2.setGravity(CENTER);
                myButton2.setTextColor(Color.WHITE);
                LL.addView(myButton2, bp2);

                LinearLayout.LayoutParams bp3 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp3.weight=0.25f;
                Button myButton3 = new Button(this);
                myButton3.setText(status.getString("info"));
                myButton3.setBackgroundColor(Color.TRANSPARENT);
                myButton3.setGravity(CENTER);
                myButton3.setTextColor(Color.WHITE);
                LL.addView(myButton3, bp3);

                LinearLayout.LayoutParams bp4 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bp4.weight=0.25f;
                Button myButton4 = new Button(this);
                myButton4.setText(status.getString("date"));
                myButton4.setBackgroundColor(Color.TRANSPARENT);
                myButton4.setGravity(CENTER);
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
            JSONArray members = board.getJSONArray("members");
            LinearLayout.LayoutParams bpXX = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            String memberXX = board.getString("owner");
            final Button myButtonXX = new Button(this);
            myButtonXX.setText("Owner: "+memberXX);
            myButtonXX.setBackgroundColor(Color.TRANSPARENT);
            myButtonXX.setGravity(CENTER);
            myButtonXX.setTextColor(Color.WHITE);
            l2.addView(myButtonXX, bpXX);
            for (int i = 0; i < members.length(); i++) {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                String member = members.getString(i);
                final Button myButton = new Button(this);
                myButton.setText(member);
                myButton.setTag(member);
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(CENTER);
                myButton.setTextColor(Color.WHITE);
                if (memberXX.toLowerCase().equals(edt_username))
                    myButton.setOnClickListener(new View.OnClickListener()
                    {
                        public void onClick(View v)
                        {
                            setContentView(R.layout.in_leaveboard);
                            ((TextView)findViewById(R.id.input_static_text)).setText("Do you want to kick out "+v.getTag()+"?");
                            Button button2 = (Button) findViewById(R.id.input_no);
                            button2.setOnClickListener(new View.OnClickListener() {
                                public void onClick(View v) {
                                    Lmembers();
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
                                        String board = BOARD.getString("name");
                                        sendRequest("KickOut", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                                ",\"owner\":\"" + owner + "\",\"member\":\"" + v.getTag() + "\"}");
                                        Lmembers();
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }
                            });
                        }
                    });
                l2.addView(myButton, bp);
            }
            JSONArray invitations = board.getJSONArray("invitations");
            if (invitations.length()!=0) {
                LinearLayout.LayoutParams bpXXS = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                bpXXS.setMargins(0,30,0,0);
                final Button myButtonXXX = new Button(this);
                myButtonXXX.setText("Invited:");
                myButtonXXX.setBackgroundColor(Color.TRANSPARENT);
                myButtonXXX.setGravity(CENTER);
                myButtonXXX.setTextColor(Color.WHITE);
                ll.addView(myButtonXXX, bpXXS);
                for (int i = 0; i < invitations.length(); i++) {
                    LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    String invitation = invitations.getString(i);
                    final Button myButton = new Button(this);
                    myButton.setText(invitation);
                    myButton.setTag(invitation);
                    myButton.setBackgroundColor(Color.TRANSPARENT);
                    myButton.setGravity(CENTER);
                    myButton.setTextColor(Color.WHITE);
                    if (memberXX.toLowerCase().equals(edt_username))
                        myButton.setOnClickListener(new View.OnClickListener()
                        {
                            public void onClick(View v)
                            {
                                setContentView(R.layout.in_leaveboard);
                                ((TextView)findViewById(R.id.input_static_text)).setText("Do you want to cancel invitation for "+v.getTag()+"?");
                                Button button2 = (Button) findViewById(R.id.input_no);
                                button2.setOnClickListener(new View.OnClickListener() {
                                    public void onClick(View v) {
                                        Lmembers();
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
                                            String board = BOARD.getString("name");
                                            sendRequest("KickOut", "{\"login\":\"" + edt_username + "\",\"password\":\"" + edt_password + "\",\"board\":\"" + board + "\"" +
                                                    ",\"owner\":\"" + owner + "\",\"member\":\"" + v.getTag() + "\"}");
                                            Lmembers();
                                        } catch (JSONException e) {
                                            e.printStackTrace();
                                        }
                                    }
                                });
                            }
                        });
                    ll.addView(myButton, bp);
                }
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
            if (tasks.length()==0)
            {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                final Button myButton = new Button(this);
                myButton.setText("No tasks here");
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(CENTER);
                myButton.setTextColor(Color.WHITE);
                LinearLayout.LayoutParams bp8 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                ll.addView(myButton, bp8);
            }
            else
                for (int i = 0; i < tasks.length(); i++) {
                    LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    JSONObject task = tasks.getJSONObject(i);
                    final Button myButton = new Button(this);
                    myButton.setText(task.getString("name"));
                    myButton.setBackgroundColor(Color.TRANSPARENT);
                    myButton.setGravity(CENTER);
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
            if (boards.length()==0)
            {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                final Button myButton = new Button(this);
                myButton.setText("You have no boards");
                myButton.setBackgroundColor(Color.TRANSPARENT);
                myButton.setGravity(CENTER);
                myButton.setTextColor(Color.WHITE);
                LinearLayout.LayoutParams bp8 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                ll.addView(myButton, bp8);
            }
            else
                for (int i = 0; i < boards.length(); i++) {
                    JSONObject board = boards.getJSONObject(i);
                    final Button myButton = new Button(this);
                    myButton.setText(board.getString("name")+" ("+board.get("owner")+")");
                    myButton.setBackgroundColor(Color.TRANSPARENT);
                    myButton.setGravity(CENTER);
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
            if (invitations.length()!=0)
            {
                LinearLayout.LayoutParams bp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                final Button myButtonEE = new Button(this);
                myButtonEE.setText("Invitations");
                myButtonEE.setBackgroundColor(Color.TRANSPARENT);
                myButtonEE.setGravity(CENTER);
                myButtonEE.setTextColor(Color.WHITE);
                LinearLayout.LayoutParams bp8 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                ll.addView(myButtonEE, bp8);

                for (int i = 0; i < invitations.length(); i++) {
                    JSONObject invitation = invitations.getJSONObject(i);
                    Button myButton = new Button(this);
                    myButton.setText(invitation.getString("name")+" ("+invitation.get("owner")+")");
                    myButton.setBackgroundColor(Color.TRANSPARENT);
                    myButton.setGravity(CENTER);
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
                                Lboards();
                            }
                        }
                    });
                    LinearLayout.LayoutParams pp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    l2.addView(myButton, pp);
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    //user/account methods
    private boolean SignUp(){
        try {
            boolean ressss=sendRequest("registration",
                    "{\"login\":\""+((EditText)findViewById(R.id.user_login)).getText().toString().trim()+"\"," +
                            "\"password\":\""+((EditText)findViewById(R.id.user_password)).getText().toString().trim()+"\"," +
                            "\"password2\":\""+((EditText)findViewById(R.id.user_password2)).getText().toString().trim()+"\"," +
                            "\"email\":\""+((EditText)findViewById(R.id.user_email)).getText().toString().trim()+"\"}");
            return ressss;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    private boolean SignIn(){
            loadPreferences();
            if (sendRequest("authorization","{\"login\":\""+edt_username.trim()+"\",\"password\":\""+edt_password.trim()+"\"}")) {
                return true;
            }
            else
                return false;
    }
    private void LogOut(){
        clearPreferences();
    }
    public String error="";
    //send json np "{\"phonetype\":\"N95\",\"cat\":\"WP\"}"
    private boolean sendRequestMain(String urlAddress, String json) throws IOException {
        boolean _return=false;
        URL url;
        HttpURLConnection connection = null;
        try {
            url = new URL(SERVER_ADDRESS+"/"+urlAddress);
            connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoInput(true);
            connection.setReadTimeout(10000 /* milliseconds */ );
            connection.setConnectTimeout(15000 /* milliseconds */ );
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
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                StringBuilder sb = new StringBuilder();

                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();
                error=sb.toString();
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
        if (error!="")
        {
            makeToast(error);
            error="";
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
    }

    private void makeToast(String text){
        Context context = getApplicationContext();
        int duration = Toast.LENGTH_SHORT;
        Toast toast = Toast.makeText(context, text, duration);
        toast.show();
    }

    //get custom input
    public int gloall=0;
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
        try {
            editor.putString(PREF_UNAME, ((EditText) findViewById(R.id.user_login)).getText().toString().trim());
            editor.putString(PREF_PASSWORD, ((EditText) findViewById(R.id.user_password)).getText().toString().trim());
        }
        catch (NullPointerException e)
        {
            editor.putString(PREF_UNAME, edt_username);
            editor.putString(PREF_PASSWORD, edt_password);
        }
        editor.commit();
    }
    private  void clearPreferences() {
        SharedPreferences preferences = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);
        preferences.edit().remove(PREF_UNAME).remove(PREF_PASSWORD).commit();
    }
}
