<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('guest_events', function (Blueprint $table) {
            $table->id();
            $table->uuid('guest_id')->nullable();
            $table->foreign('guest_id')
                ->references('id')
                ->on('guests')
                ->onDelete('cascade');
            $table->string('event_name');
            $table->jsonb('metadata');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('guest_events');
    }
};
