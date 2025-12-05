package com.nird.nird.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ParentChildId implements Serializable {

    private Long parentId;
    private Long childId;

    public ParentChildId() {}

    public ParentChildId(Long parentId, Long childId) {
        this.parentId = parentId;
        this.childId = childId;
    }

    // --- Getters & Setters ---
    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

    // --- equals & hashCode ---
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ParentChildId)) return false;
        ParentChildId that = (ParentChildId) o;
        return Objects.equals(parentId, that.parentId) &&
                Objects.equals(childId, that.childId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(parentId, childId);
    }
}