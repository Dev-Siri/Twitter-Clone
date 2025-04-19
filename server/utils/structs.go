package utils

import (
	"reflect"
	"strconv"
	"strings"
	"time"
)

func StructToMap(data interface{}) map[string]string {
	result := make(map[string]string)

	valueType := reflect.TypeOf(data).Elem()
	value := reflect.ValueOf(data).Elem()

	if valueType.Kind() == reflect.Struct {
		for i := 0; i < valueType.NumField(); i++ {
			field := valueType.Field(i)
			fieldName := field.Name
			fieldName = strings.ToLower(fieldName[:1]) + fieldName[1:]
			fieldValue := value.Field(i).Interface()
			fieldValueString := ""

			switch v := fieldValue.(type) {
			case int:
				fieldValueString = strconv.Itoa(v)
			case time.Time:
				fieldValueString = v.UTC().String()
			default:
				fieldValueString = fieldValue.(string)
			}
			result[fieldName] = fieldValueString
		}
	}

	return result
}
