package org.nelg.SpringWeb.form.base;

import org.apache.commons.lang3.builder.ToStringBuilder;

abstract public class BaseForm {

    protected boolean submit;

    public boolean isSubmit() {
        return submit;
    }

    public BaseForm setSubmit(boolean submit) {
        this.submit = submit;
        return this;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
