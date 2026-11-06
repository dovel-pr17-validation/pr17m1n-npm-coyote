<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTopicsToTagsTable extends Migration
{
    use SchemaBuilder;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->table('tags', function (Blueprint $table) {
            $table->integer('topics')->default(0);
        });

        $this->db
            ->table('tags')
            ->update([
                'topics' => $this->db->raw(
                    '(SELECT COUNT(*)
                    FROM topic_tags
                        JOIN topics ON topics.id = topic_tags.topic_id
                    WHERE topic_tags.tag_id = tags.id AND topics.deleted_at IS NULL)'
                )
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema->table('tags', function (Blueprint $table) {
            $table->dropColumn('topics');
        });
    }
}
