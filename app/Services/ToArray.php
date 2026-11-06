<?php
namespace Coyote\Services;

/**
 * @deprecated
 */
trait ToArray
{
    /**
     * @deprecated
     */
    public function toArray()
    {
        $reflect = new \ReflectionObject($this);
        $result = [];
        foreach ($reflect->getProperties(\ReflectionProperty::IS_PUBLIC) as $prop) {
            $result[$prop->getName()] = $prop->getValue($this);
        }
        return $result;
    }
}
