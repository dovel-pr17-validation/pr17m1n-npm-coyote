<?php
namespace Coyote\Post;

use Coyote\Models\Scopes\ForUser;
use Coyote\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $post_id
 * @property int $user_id
 * @property int $forum_id
 * @property string $ip
 * @property User $user
 */
class Vote extends Model
{
    use ForUser;

    protected $fillable = ['post_id', 'user_id', 'forum_id', 'ip'];
    protected $dateFormat = 'Y-m-d H:i:se';
    protected $table = 'post_votes';
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }
}
