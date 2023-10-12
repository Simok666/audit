<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditEmailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audit_email', function (Blueprint $table) {
            $table->id();
            $table->text('id_audit');
            $table->text('from');
            $table->text('to');
            $table->text('cc');
            $table->text('subject');
            $table->text('content');
            $table->integer('actived');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('audit_email');
    }
}
