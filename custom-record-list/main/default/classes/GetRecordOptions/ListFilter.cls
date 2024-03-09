/**
 * @description This class is used to store the filter values for the list view passed in via the lightning component
 */
public inherited sharing class ListFilter {
  /**
   * @description The field to filter on
   */
  @AuraEnabled
  public String field { get; set; }
  /**
   * @description The value to filter on
   */
  @AuraEnabled
  public Comparate comparate { get; set; }
  /**
   * @description The operator to use for the filter
   */
  @AuraEnabled
  public String operator { get; set; }

  /**
   * @description builds a filter for a query, decorates the binds map with the value of the filter
   * @param binds Map<String, Object> of the binds for the query
   * @return String of the filter
   */
  public String buildQueryFilter(Map<String, Object> binds) {
    String varName = this.field + Math.abs(UUID.randomUUID().hashCode());
    System.debug('varName ' + varName);
    switch on this.comparate.type {
      when 'boolean' {
        binds.put(varName, (Boolean) this.comparate.value);
      }
      when 'integer' {
        binds.put(varName, (Integer) this.comparate.value);
      }
      when 'string' {
        binds.put(varName, (String) this.comparate.value);
      }
      when 'decimal' {
        binds.put(varName, (Decimal) this.comparate.value);
      }
      when else {
        throw new ListFilterException('Invalid comparate type');
      }
    }

    return (this.field + ' ' + this.operator + ' :' + varName);
  }

  private class ListFilterException extends Exception {
  }
}
